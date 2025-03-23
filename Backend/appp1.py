from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Ensure the upload directory exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# In-memory storage for attached files (for demonstration purposes)
attached_files = []

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    description = request.form.get('description', '')

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)

        # Store file metadata
        file_data = {
            "id": len(attached_files) + 1,
            "name": file.filename,
            "description": description,
            "size": os.path.getsize(filename),
            "date": request.form.get('date', '')
        }
        attached_files.append(file_data)

        return jsonify({"message": "File successfully uploaded", "file": file_data}), 200

@app.route('/files', methods=['GET'])
def list_files():
    return jsonify(attached_files)

@app.route('/files/<int:file_id>', methods=['GET'])
def download_file(file_id):
    file = next((f for f in attached_files if f['id'] == file_id), None)
    if file:
        return send_from_directory(app.config['UPLOAD_FOLDER'], file['name'], as_attachment=True)
    return jsonify({"error": "File not found"}), 404

@app.route('/activities', methods=['GET'])
def get_activities():
    activities = [
        {"date": "Mar 10, 2025", "action": "Royalty Payment", "status": "Pending", "icon": "💸"},
        {"date": "Mar 05, 2025", "action": "Monthly Report", "status": "Submitted", "icon": "📊"},
        {"date": "Feb 20, 2025", "action": "Site Inspection", "status": "Completed", "icon": "✅"},
        {"date": "Feb 15, 2025", "action": "License Renewal", "status": "Approved", "icon": "🔄"}
    ]
    return jsonify(activities)

if __name__ == '__main__':
    app.run(debug=True)