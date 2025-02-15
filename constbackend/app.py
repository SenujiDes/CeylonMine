from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import logging
import sys
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# Update CORS configuration
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

api = Api(app)
db = SQLAlchemy(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
WATER_GEL_MULTIPLIER = 1.2
BLASTED_ROCK_MULTIPLIER = 2.83
DENSITY_FACTOR = 1.6
ROYALTY_RATE_PER_CUBIC_METER = 240
SSCL_RATE = 0.0256  # 2.56%
VAT_RATE = 0.18     # 18%

# Database Models
class RoyaltyCalculation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calculation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    water_gel = db.Column(db.Float, nullable=False)
    nh4no3 = db.Column(db.Float, nullable=False)
    powder_factor = db.Column(db.Float, nullable=False)
    total_explosive_quantity = db.Column(db.Float, nullable=False)
    blasted_rock_volume = db.Column(db.Float, nullable=False)
    base_royalty = db.Column(db.Float, nullable=False)
    royalty_with_sscl = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)

class ExplosivesCalculator:
    @staticmethod
    def calculate_total_explosive_quantity(water_gel: float, nh4no3: float) -> float:
        """Calculate Total Explosive Quantity (TEQ)"""
        return (water_gel * WATER_GEL_MULTIPLIER) + nh4no3

    @staticmethod
    def calculate_rock_volume(teq: float, powder_factor: float) -> float:
        """Calculate Rock Volume"""
        return teq / powder_factor

    @staticmethod
    def calculate_blasted_rock_volume(teq: float, powder_factor: float) -> float:
        """Calculate Blasted Rock Volume using the new formula"""
        return (teq * DENSITY_FACTOR) / (powder_factor * BLASTED_ROCK_MULTIPLIER)

    @staticmethod
    def calculate_royalty(volume: float) -> float:
        """Calculate base royalty fee"""
        return volume * ROYALTY_RATE_PER_CUBIC_METER

    @staticmethod
    def apply_sscl(royalty: float) -> float:
        """Apply SSCL tax (2.56%)"""
        return royalty * 1.0256

    @staticmethod
    def apply_vat(royalty_with_sscl: float) -> float:
        """Apply VAT (18%)"""
        return royalty_with_sscl * 1.18

class RoyaltyCalculationResource(Resource):
    def post(self):
        """Handle POST requests for explosives royalty calculations"""
        try:
            data = request.get_json()
            
            # Validate required fields
            if not data:
                return {"error": "No data provided"}, 400
            
            required_fields = ['water_gel', 'nh4no3', 'powder_factor']
            for field in required_fields:
                if field not in data:
                    return {"error": f"Missing required field: {field}"}, 400
            
            # Extract and validate input
            try:
                water_gel = float(data['water_gel'])
                nh4no3 = float(data['nh4no3'])
                powder_factor = float(data['powder_factor'])
                
                if any(val <= 0 for val in [water_gel, nh4no3, powder_factor]):
                    return {"error": "All values must be positive"}, 400
                
            except ValueError:
                return {"error": "Invalid numeric values provided"}, 400
            
            # Perform calculations
            calculator = ExplosivesCalculator()
            
            # Step 1: Calculate TEQ
            teq = calculator.calculate_total_explosive_quantity(water_gel, nh4no3)
            
            # Step 2: Calculate Rock Volume
            basic_volume = calculator.calculate_rock_volume(teq, powder_factor)
            
            # Step 3: Calculate Blasted Rock Volume
            blasted_volume = calculator.calculate_blasted_rock_volume(teq, powder_factor)
            
            # Step 4: Calculate base royalty
            base_royalty = calculator.calculate_royalty(blasted_volume)
            
            # Step 5: Apply SSCL (2.56%)
            royalty_with_sscl = calculator.apply_sscl(base_royalty)
            
            # Step 6: Apply VAT (18%)
            total_amount = calculator.apply_vat(royalty_with_sscl)
            
            # Save calculation to database
            calculation = RoyaltyCalculation(
                water_gel=water_gel,
                nh4no3=nh4no3,
                powder_factor=powder_factor,
                total_explosive_quantity=teq,
                blasted_rock_volume=blasted_volume,
                base_royalty=base_royalty,
                royalty_with_sscl=royalty_with_sscl,
                total_amount=total_amount
            )
            db.session.add(calculation)
            db.session.commit()
            
            response = {
                "calculation_date": datetime.now().isoformat(),
                "inputs": {
                    "water_gel_kg": water_gel,
                    "nh4no3_kg": nh4no3,
                    "powder_factor": powder_factor
                },
                "calculations": {
                    "total_explosive_quantity": round(teq, 2),
                    "basic_volume": round(basic_volume, 2),
                    "blasted_rock_volume": round(blasted_volume, 2),
                    "base_royalty": round(base_royalty, 2),
                    "royalty_with_sscl": round(royalty_with_sscl, 2),
                    "total_amount_with_vat": round(total_amount, 2)
                },
                "rates_applied": {
                    "royalty_rate_per_cubic_meter": ROYALTY_RATE_PER_CUBIC_METER,
                    "sscl_rate": "2.56%",
                    "vat_rate": "18%"
                }
            }
            
            logger.info(f"Successful calculation for TEQ: {teq}")
            return response, 200
            
        except Exception as e:
            db.session.rollback()
            logger.error(f"Unexpected error: {str(e)}")
            return {"error": "Internal server error"}, 500

# Register the resource
api.add_resource(RoyaltyCalculationResource, '/api/calculate-royalty')

# Root route for API health check
@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "healthy",
        "message": "Explosives Royalty Calculator API",
        "version": "1.0.0"
    })

# Create database tables
with app.app_context():
    db.create_all()

@app.before_request
def log_request_info():
    logger.info('Headers: %s', request.headers)
    logger.info('Body: %s', request.get_data())

@app.after_request
def after_request(response):
    logger.info('Response: %s', response.get_data())
    return response

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', debug=True, port=port, threaded=True)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1)