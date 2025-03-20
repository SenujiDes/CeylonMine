from flask import jsonify, request, current_app

def init_routes(bp):
    @bp.route('/submit', methods=['POST'])
    def submit_contact():
        try:
            data = request.json
            supabase = current_app.supabase

            # Insert data into Supabase
            response = supabase.table('contact_data').insert({
                'name': data['fullName'],
                'email': data['email'],
                'phone': data['phoneNumber'],
                'subject': data['subject'],
                'message': data['message']
            }).execute()

            return jsonify({"message": "Contact message submitted successfully!", "data": response.data}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.route('/get', methods=['GET'])
    def get_contacts():
        try:
            supabase = current_app.supabase
            # Fetch data from Supabase
            response = supabase.table('contacts').select('*').execute()
            return jsonify(response.data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500