from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from datetime import datetime
import logging
import sys
import os

app = Flask(__name__)
CORS(app)
api = Api(app)

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

class ExplosivesCalculator:
    @staticmethod
    def calculate_total_explosive_quantity(water_gel: float, nh4no3: float) -> float:
        """Calculate Total Explosive Quantity (TEQ)"""
        return (water_gel * WATER_GEL_MULTIPLIER) + nh4no3

    @staticmethod
    def calculate_blasted_rock_volume(teq: float, powder_factor: float) -> float:
        """Calculate Blasted Rock Volume"""
        return (teq * BLASTED_ROCK_MULTIPLIER * DENSITY_FACTOR) / powder_factor

    @staticmethod
    def calculate_royalty(volume: float) -> float:
        """Calculate base royalty fee"""
        return volume * ROYALTY_RATE_PER_CUBIC_METER

    @staticmethod
    def apply_sscl(royalty: float) -> float:
        """Apply SSCL tax"""
        return royalty * (1 + SSCL_RATE)

    @staticmethod
    def apply_vat(royalty_with_sscl: float) -> float:
        """Apply VAT"""
        return royalty_with_sscl * (1 + VAT_RATE)

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
            
            # Step 2: Calculate Blasted Rock Volume
            volume = calculator.calculate_blasted_rock_volume(teq, powder_factor)
            
            # Step 3: Calculate base royalty
            base_royalty = calculator.calculate_royalty(volume)
            
            # Step 4: Apply SSCL
            royalty_with_sscl = calculator.apply_sscl(base_royalty)
            
            # Step 5: Apply VAT for final total
            total_amount = calculator.apply_vat(royalty_with_sscl)
            
            response = {
                "calculation_date": datetime.now().isoformat(),
                "inputs": {
                    "water_gel_kg": water_gel,
                    "nh4no3_kg": nh4no3,
                    "powder_factor": powder_factor
                },
                "calculations": {
                    "total_explosive_quantity": round(teq, 2),
                    "blasted_rock_volume": round(volume, 2),
                    "base_royalty": round(base_royalty, 2),
                    "royalty_with_sscl": round(royalty_with_sscl, 2),
                    "total_amount_with_vat": round(total_amount, 2)
                },
                "rates_applied": {
                    "royalty_rate_per_cubic_meter": ROYALTY_RATE_PER_CUBIC_METER,
                    "sscl_rate": f"{SSCL_RATE * 100}%",
                    "vat_rate": f"{VAT_RATE * 100}%"
                }
            }
            
            logger.info(f"Successful calculation for TEQ: {teq}")
            return response, 200
            
        except Exception as e:
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

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', debug=True, port=port)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1)