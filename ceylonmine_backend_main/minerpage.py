from flask import Blueprint, jsonify
from supabase import create_client, Client
from config import Config
from datetime import datetime, timedelta

# Create a Blueprint for miner-related routes
miner_bp = Blueprint('miner', __name__, url_prefix='/miner')

# Function to calculate expiration date based on period_of_validation
def calculate_expiration_date(start_date, period_of_validation):
    years = int(period_of_validation.split()[0])  # Extract the number of years
    expiration_date = start_date + timedelta(days=365 * years)  # Add years to the start date
    return expiration_date

# Endpoint to fetch license status and expiry date
@miner_bp.route('/license', methods=['GET'])
def get_license():
    try:
        # Get the userId of the currently logged-in user (assuming it's passed in the request headers)
        user_id = request.headers.get('User-ID')
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        # Fetch the exploration_license_no and period_of_validation from the 'application' table using the userId
        application_response = supabase.table('application').select("exploration_license_no, period_of_validation").eq('userId', user_id).execute()
        if not application_response.data:
            return jsonify({"error": "No application found for the user"}), 404

        application_data = application_response.data[0]
        exploration_license_no = application_data['exploration_license_no']
        period_of_validation = application_data.get('period_of_validation', '1 yr')  # Default to 1 year if not provided

        # Fetch the active_date from the 'users' table for the logged-in user
        user_response = supabase.table('users').select("active_date").eq('userId', user_id).execute()
        if not user_response.data:
            return jsonify({"error": "User not found"}), 404

        user_data = user_response.data[0]
        active_date_str = user_data.get('active_date')

        # Calculate the expiry date
        if active_date_str:
            active_date = datetime.strptime(active_date_str, '%Y-%m-%d')
            expiry_date = calculate_expiration_date(active_date, period_of_validation)
        else:
            return jsonify({"error": "Active date is not available"}), 400

        return jsonify({
            "license_status": "Active",  # Assuming the license is active if we have an active_date
            "license_number": exploration_license_no,
            "active_date": active_date_str,
            "period_of_validation": period_of_validation,
            "expires": expiry_date.strftime('%Y-%m-%d')  # Format expiry date
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to fetch recent announcements
@miner_bp.route('/announcements', methods=['GET'])
def get_announcements():
    try:
        # Fetch data from the 'comments' table, ordered by creation date in descending order
        response = supabase.table('comments').select("*").order('created_at', desc=True).execute()
        announcements = response.data
        return jsonify(announcements)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Function to initialize routes
def init_routes(bp):
    global supabase
    supabase = init_supabase(bp.app)
    bp.add_url_rule('/royalty', view_func=get_royalty)
    bp.add_url_rule('/license', view_func=get_license)
    bp.add_url_rule('/announcements', view_func=get_announcements)
