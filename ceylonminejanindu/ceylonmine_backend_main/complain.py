from flask import jsonify, request, current_app

def init_routes(bp):
    @bp.route('/submit', methods=['POST'])
    def submit_complaint():
        try:
            data = request.json
            supabase = current_app.supabase

            # Insert data into Supabase
            response = supabase.table('complaints').insert({
                'email': data['email'],
                'project': data['project'],
                'complaint_text': data['complaint_text']
            }).execute()

            return jsonify({"message": "Complaint submitted successfully!", "data": response.data}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.route('/get', methods=['GET'])
    def get_complaints():
        try:
            supabase = current_app.supabase
            # Fetch data from Supabase
            response = supabase.table('complaints').select('*').execute()
            return jsonify(response.data), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500



