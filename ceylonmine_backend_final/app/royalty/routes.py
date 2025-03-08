from flask import Blueprint, jsonify, request
from app.royalty.models import RoyaltyCalculation
from app import db

royalty_bp = Blueprint('royalty', __name__)

@royalty_bp.route('/calculate', methods=['POST'])
def calculate_royalty():
    # Handle royalty calculation
    data = request.json
    # Perform calculations and save to database
    calculation = RoyaltyCalculation(water_gel=data['water_gel'], nh4no3=data['nh4no3'], powder_factor=data['powder_factor'])
    db.session.add(calculation)
    db.session.commit()
    return jsonify({'message': 'Royalty calculated successfully'}), 201