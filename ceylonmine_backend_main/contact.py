from flask import jsonify, request, current_app
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def init_routes(bp):
    @bp.route('/submit', methods=['POST'])
    def submit_contact():
        try:
            data = request.json
            supabase = current_app.supabase

            # Log the received data for debugging
            logger.debug(f"Received data: {data}")

            # Prepare the data for insertion
            contact_data = {
                'name': data.get('name'),
                'email': data.get('email'),
                'phone': data.get('phone', None),  # Optional field
                'subject': data.get('subject', None),  # Optional field
                'message': data.get('message')
            }

            # Insert data into Supabase
            response = supabase.table('contacts').insert(contact_data).execute()

            # Log the response from Supabase
            logger.debug(f"Supabase response: {response}")

            if response.status_code == 201:
                return jsonify({"message": "Contact message submitted successfully!", "data": response.data}), 201
            else:
                logger.error(f"Supabase error: {response.status_code} - {response.data}")
                return jsonify({"error": "Failed to submit contact message", "details": response.data}), response.status_code

        except Exception as e:
            # Log the error
            logger.error(f"Error submitting contact message: {e}")
            return jsonify({"error": str(e)}), 500

    @bp.route('/get', methods=['GET'])
    def get_contacts():
        try:
            supabase = current_app.supabase
            # Fetch data from Supabase
            response = supabase.table('contacts').select('*').execute()

            # Log the fetched data for debugging
            logger.debug(f"Fetched contacts: {response.data}")

            if response.status_code == 200:
                return jsonify(response.data), 200
            else:
                logger.error(f"Supabase error: {response.status_code} - {response.data}")
                return jsonify({"error": "Failed to fetch contacts", "details": response.data}), response.status_code

        except Exception as e:
            # Log the error
            logger.error(f"Error fetching contacts: {e}")
            return jsonify({"error": str(e)}), 500