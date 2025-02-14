from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from datetime import datetime
from dateutil import parser
from typing import Dict, Union
import logging
import sys
import os

app = Flask(__name__)
CORS(app)
api = Api(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants for royalty rates
ROYALTY_RATES = {
    'precious_metals': 0.07,
    'industrial_minerals': 0.06,
    'industrial_minerals_exported': 0.07,
    'building_materials': 0.04,
    'dimension_stone_exported': 0.07,
    'base_and_other_metals': 0.06
}

PENALTY_RATE = 0.20  # 20% penalty for late payments

class RoyaltyCalculator:
    @staticmethod
    def calculate_royalty(market_value: float, mineral_type: str) -> float:
        """Calculate the basic royalty amount."""
        if mineral_type not in ROYALTY_RATES:
            raise ValueError(f"Invalid mineral type: {mineral_type}")
        return market_value * ROYALTY_RATES[mineral_type]

    @staticmethod
    def calculate_penalty(royalty_amount: float, due_date: str = None) -> float:
        """Calculate penalty if payment is overdue."""
        if not due_date:
            return 0
        
        try:
            due_date = parser.parse(due_date)
            if due_date.date() < datetime.now().date():
                return royalty_amount * PENALTY_RATE
        except (ValueError, TypeError) as e:
            logger.error(f"Error parsing due date: {e}")
            raise ValueError("Invalid due date format")
        
        return 0

class RoyaltyCalculationResource(Resource):
    def post(self):
        """Handle POST requests for royalty calculations."""
        try:
            data = request.get_json()
            
            # Validate required fields
            if not data:
                return {"error": "No data provided"}, 400
            
            required_fields = ['mineral_type', 'market_value']
            for field in required_fields:
                if field not in data:
                    return {"error": f"Missing required field: {field}"}, 400
            
            # Extract and validate input
            mineral_type = data['mineral_type']
            try:
                market_value = float(data['market_value'])
                if market_value <= 0:
                    return {"error": "Market value must be positive"}, 400
            except ValueError:
                return {"error": "Invalid market value"}, 400
            
            due_date = data.get('due_date')
            
            # Calculate royalty
            calculator = RoyaltyCalculator()
            royalty_amount = calculator.calculate_royalty(market_value, mineral_type)
            penalty_amount = calculator.calculate_penalty(royalty_amount, due_date)
            total_amount = royalty_amount + penalty_amount
            
            response = {
                "royalty_amount": round(royalty_amount, 2),
                "penalty_amount": round(penalty_amount, 2),
                "total_amount_due": round(total_amount, 2),
                "calculation_date": datetime.now().isoformat(),
                "mineral_type": mineral_type,
                "applied_rate": ROYALTY_RATES[mineral_type]
            }
            
            logger.info(f"Successful calculation for mineral type: {mineral_type}")
            return response, 200
            
        except ValueError as e:
            logger.error(f"Validation error: {str(e)}")
            return {"error": str(e)}, 400
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
        "message": "Mineral Royalty Calculator API",
        "version": "1.0.0"
    })

if __name__ == '__main__':
    try:
        port = int(os.environ.get('PORT', 5000))
        app.run(host='0.0.0.0', debug=True, port=port)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1) 