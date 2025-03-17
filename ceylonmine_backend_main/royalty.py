# from flask import jsonify, request, current_app

# def init_routes(bp):
#     @bp.route('/submit', methods=['POST'])
#     def submit_royalty():
#         try:
#             data = request.json
#             supabase = current_app.supabase

#             # Insert data into Supabase
#             response = supabase.table('royalty').insert({
#                 'email': data['email'],
#                 'project': data['project'],
#                 'amount': data['amount']
#             }).execute()

#             return jsonify({"message": "Royalty submitted successfully!", "data": response.data}), 201
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

#     @bp.route('/get', methods=['GET'])
#     def get_royalties():
#         try:
#             supabase = current_app.supabase
#             # Fetch data from Supabase
#             response = supabase.table('royalty').select('*').execute()
#             return jsonify(response.data), 200
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500

#     @bp.route('/calculate', methods=['POST'])
#     def calculate_royalty():
#         try:
#             data = request.json
#             supabase = current_app.supabase

#             # Insert data into Supabase
#             response = supabase.table('royalty_calculations').insert({
#                 'water_gel': data['water_gel'],
#                 'nh4no3': data['nh4no3'],
#                 'powder_factor': data['powder_factor'],
#                 'total_explosive_quantity': data['total_explosive_quantity'],
#                 'blasted_rock_volume': data['blasted_rock_volume'],
#                 'base_royalty': data['base_royalty'],
#                 'royalty_with_sscl': data['royalty_with_sscl'],
#                 'total_amount': data['total_amount']
#             }).execute()

#             return jsonify({"message": "Royalty calculated successfully!", "data": response.data}), 201
#         except Exception as e:
#             return jsonify({"error": str(e)}), 500




from flask import jsonify, request, current_app
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

def init_routes(bp):
    @bp.route('/submit', methods=['POST'])
    def submit_royalty():
        try:
            # Get JSON data from the request
            data = request.json
            logging.debug(f"Received data: {data}")

            # Validate required fields
            required_fields = ['email', 'project', 'amount']
            for field in required_fields:
                if field not in data:
                    logging.error(f"Missing required field: {field}")
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            # Insert data into the 'royalty' table
            supabase = current_app.supabase
            response = supabase.table('royalty').insert({
                'email': data['email'],
                'project': data['project'],
                'amount': data['amount']
            }).execute()

            logging.debug(f"Supabase response: {response}")
            return jsonify({"message": "Royalty submitted successfully!", "data": response.data}), 201
        except Exception as e:
            logging.error(f"Error in submit_royalty: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500

    @bp.route('/get', methods=['GET'])
    def get_royalties():
        try:
            # Fetch data from the 'royalty' table
            supabase = current_app.supabase
            response = supabase.table('royalty').select('*').execute()

            logging.debug(f"Fetched data: {response.data}")
            return jsonify(response.data), 200
        except Exception as e:
            logging.error(f"Error in get_royalties: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500

    @bp.route('/calculate', methods=['POST'])
    def calculate_royalty():
        try:
            # Get JSON data from the request
            data = request.json
            logging.debug(f"Received data: {data}")

            # Validate required fields
            required_fields = [
                'water_gel', 'nh4no3', 'powder_factor', 'total_explosive_quantity',
                'blasted_rock_volume', 'base_royalty', 'royalty_with_sscl', 'total_amount'
            ]
            for field in required_fields:
                if field not in data:
                    logging.error(f"Missing required field: {field}")
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            # Insert data into the 'royalty_calculations' table
            supabase = current_app.supabase
            response = supabase.table('royalty_calculations').insert({
                'water_gel': data['water_gel'],
                'nh4no3': data['nh4no3'],
                'powder_factor': data['powder_factor'],
                'total_explosive_quantity': data['total_explosive_quantity'],
                'blasted_rock_volume': data['blasted_rock_volume'],
                'base_royalty': data['base_royalty'],
                'royalty_with_sscl': data['royalty_with_sscl'],
                'total_amount': data['total_amount']
            }).execute()

            logging.debug(f"Supabase response: {response}")
            return jsonify({"message": "Royalty calculated successfully!", "data": response.data}), 201
        except Exception as e:
            logging.error(f"Error in calculate_royalty: {e}", exc_info=True)
            return jsonify({"error": str(e)}), 500