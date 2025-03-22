from flask import jsonify, request, current_app
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def init_routes(bp):

    @bp.route('/get', methods=['GET'])
    def get_royalties():
        try:
            supabase = current_app.supabase
            # Fetch data from Supabase
            response = supabase.table('royalty').select('*').execute()
            return jsonify(response.data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
            
    @bp.route('/calculate', methods=['POST'])
    def calculate_royalty():
        try:
            # Log the start of the function
            logging.debug("Starting calculate_royalty function")

            # Get JSON data from the request
            data = request.json
            logging.debug(f"Received data: {data}")

            # Validate required fields
            required_fields = [
                'water_gel', 'nh4no3', 'powder_factor', 'total_explosive_quantity',
                'blasted_rock_volume', 'base_royalty', 'royalty_with_sscl', 'total_amount'
            ]
            
            logging.debug("Checking for required fields")

            for field in required_fields:
                if field not in data:
                    logging.error(f"Missing required field: {field}")
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            logging.debug("All required fields are present")

            # Log the data being inserted
            logging.debug(f"Data to be inserted: {data}")

            # Insert data into the 'royalty_calculations' table
            supabase = current_app.supabase
            logging.debug("Supabase client initialized")

            # Log the Supabase table being used
            logging.debug("Inserting data into 'royalty' table")

            response = supabase.table('royalty').insert({
                'water_gel': data['water_gel'],
                'nh4no3': data['nh4no3'],
                'powder_factor': data['powder_factor'],
            }).execute()

            # Log the Supabase response
            logging.debug(f"Supabase response: {response}")

            # Return success response
            return jsonify({
                "message": "Royalty calculated successfully!",
                "data": response.data
            }), 201

        except Exception as e:
            # Log the full error with traceback
            logging.error(f"Error in calculate_royalty: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500
