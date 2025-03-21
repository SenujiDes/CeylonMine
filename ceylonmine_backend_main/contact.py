# from flask import jsonify, request, current_app
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# def init_routes(bp):
#     @bp.route('/submit', methods=['POST'])
#     def submit_contact():
#         try:
#             data = request.json
#             supabase = current_app.supabase

#             # Log the received data for debugging
#             logger.debug(f"Received data: {data}")

#             # Prepare the data for insertion
#             contact_data = {
#                 'name': data.get('name'),
#                 'email': data.get('email'),
#                 'phone': data.get('phone', None),  # Optional field
#                 'subject': data.get('subject', None),  # Optional field
#                 'message': data.get('message')
#             }

#             # Insert data into Supabase
#             response = supabase.table('contact_data').insert(contact_data).execute()

#             # Log the response from Supabase
#             logger.debug(f"Supabase response: {response}")

#             if response.status_code == 201:
#                 return jsonify({"message": "Contact message submitted successfully!", "data": response.data}), 201
#             else:
#                 logger.error(f"Supabase error: {response.status_code} - {response.data}")
#                 return jsonify({"error": "Failed to submit contact message", "details": response.data}), response.status_code

#         except Exception as e:
#             # Log the error
#             logger.error(f"Error submitting contact message: {e}")
#             return jsonify({"error": str(e)}), 500

#     @bp.route('/get', methods=['GET'])
#     def get_contacts():
#         try:
#             supabase = current_app.supabase
#             # Fetch data from Supabase
#             response = supabase.table('contacts').select('*').execute()

#             # Log the fetched data for debugging
#             logger.debug(f"Fetched contacts: {response.data}")

#             if response.status_code == 200:
#                 return jsonify(response.data), 200
#             else:
#                 logger.error(f"Supabase error: {response.status_code} - {response.data}")
#                 return jsonify({"error": "Failed to fetch contacts", "details": response.data}), response.status_code

#         except Exception as e:
#             # Log the error
#             logger.error(f"Error fetching contacts: {e}")
#             return jsonify({"error": str(e)}), 500


from flask import jsonify, request, current_app
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Utility function defined directly in this file
def handle_supabase_response(response, success_message="Operation successful", error_message="Operation failed"):
    """
    Utility function to handle responses from Supabase consistently
    """
    logger.debug(f"Processing Supabase response: {response}")
    
    try:
        # Check if response exists and has data
        if response and hasattr(response, 'data'):
            # Check if there's an error field in the response data
            if hasattr(response, 'error') and response.error:
                logger.error(f"Supabase returned an error: {response.error}")
                return {"error": error_message, "details": response.error}, 400
            
            # Check if data exists and is not empty
            if response.data:
                return {"message": success_message, "data": response.data}, 200
            else:
                # Empty data might be ok in some cases (like deletion)
                return {"message": success_message}, 200
        else:
            logger.error(f"Invalid response from Supabase: {response}")
            return {"error": error_message}, 400
    except Exception as e:
        logger.exception(f"Error processing Supabase response: {e}")
        return {"error": f"{error_message}: {str(e)}"}, 500

def init_routes(bp):
    @bp.route('/submit', methods=['POST'])
    def submit_contact():
        try:
            data = request.json
            supabase = current_app.supabase

            # Log the received data for debugging
            logger.debug(f"Received data: {data}")

            # Prepare the data for insertion - map frontend field names to database column names
            contact_data = {
                'name': data.get('fullName'),  # Changed from 'name' to 'fullName' to match frontend
                'email': data.get('email'),
                'phone': data.get('phoneNumber'),  # Changed from 'phone' to 'phoneNumber' to match frontend
                'subject': data.get('subject'),
                'message': data.get('message')
            }

            # Log the data we're about to insert
            logger.debug(f"Inserting data into Supabase: {contact_data}")

            # Insert data into Supabase
            response = supabase.table('contact_data').insert(contact_data).execute()

            # Use the helper function to handle the response
            result, status_code = handle_supabase_response(
                response, 
                success_message="Contact message submitted successfully!",
                error_message="Failed to submit contact message"
            )
            
            return jsonify(result), status_code

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

            # Use the helper function to handle the response
            result, status_code = handle_supabase_response(
                response,
                success_message="Contacts retrieved successfully",
                error_message="Failed to fetch contacts"
            )
            
            return jsonify(result), status_code

        except Exception as e:
            # Log the error
            logger.error(f"Error fetching contacts: {e}")
            return jsonify({"error": str(e)}), 500