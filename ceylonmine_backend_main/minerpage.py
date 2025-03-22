from flask import Blueprint, jsonify
from supabase import create_client, Client
from config import Config
from datetime import datetime, timedelta

# Create a Blueprint for miner-related routes
miner_bp = Blueprint('miner', __name__, url_prefix='/miner')

# Function to calculate expiration date based on period_of_validation
def calculate_expiration_date(start_date, period_of_validation):
    years = int(period_of_validation.split()[0]) 
    expiration_date = start_date + timedelta(days=365 * years) 
    return expiration_date

# Endpoint to fetch royalty amount and due date
@miner_bp.route('/royalty', methods=['GET'])
def get_royalty():
    try:
        # Fetch data from the 'royalty' table
        response = supabase.table('royalty').select("*").execute()
        royalty_data = response.data[0]  # Assuming there's only one relevant entry
        return jsonify({
            "royalty_amount_due": royalty_data['total_amount'],
            # still didn't make the column
            "due_by": royalty_data['due_date']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to fetch license status
@miner_bp.route('/license', methods=['GET'])
def get_license():
    try:
        # Fetch data from the 'application' table
        response = supabase.table('users').select("*").execute()
        license_data = response.data[0]  # Assuming there's only one relevant entry
        return jsonify({
            "license_status": license_data['license_status'],
            #use the foreign key
            "license_number": license_data['license_number'],
            # write a logic totake the expiry date
            "expires": license_data['expiry_date']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to fetch recent announcements
@miner_bp.route('/announcements', methods=['GET'])
def get_announcements():
    try:
        # Fetch data from the 'comments' table, ordered by creation date in descending order
        response = supabase.table('comments').select("*").order('created_at', desc=True).execute()
        activities = response.data
        return jsonify(activities)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to initialize routes
def init_routes(bp):
    global supabase
    supabase = init_supabase(bp.app)
    bp.add_url_rule('/royalty', view_func=get_royalty)
    bp.add_url_rule('/license', view_func=get_license)
    bp.add_url_rule('/announcements', view_func=get_announcements)
