from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import datetime

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# In-memory storage for demo (replace with database in production)
applications = {}

@app.route('/api/licenses/type-a', methods=['POST'])
def type_a_license():
    try:
        # Get form data
        company_name = request.form.get('companyName')
        owner_name = request.form.get('ownerName')
        business_type = request.form.get('businessType')
        employee_count = request.form.get('employeeCount')
        annual_revenue = request.form.get('annualRevenue')
        
        # Handle file upload
        if 'attachment' in request.files:
            file = request.files['attachment']
            if file:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        # Generate application ID and store status
        application_id = f"IML-A-{len(applications) + 1}"
        applications[application_id] = {
            'status': 'Submitted',
            'timeline': [
                {
                    'status': 'Submitted',
                    'date': datetime.datetime.now().isoformat(),
                    'comment': 'Application received and under initial review'
                }
            ],
            'data': request.form
        }

        return jsonify({
            'message': 'Application received successfully',
            'status': 'success',
            'applicationId': application_id
        }), 200

    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 500

@app.route('/api/licenses/type-c', methods=['POST'])
def type_c_license():
    try:
        # Get form data
        company_name = request.form.get('companyName')
        owner_name = request.form.get('ownerName')
        business_type = request.form.get('businessType')
        employee_count = request.form.get('employeeCount')
        annual_revenue = request.form.get('annualRevenue')
        
        # Handle file upload
        if 'attachment' in request.files:
            file = request.files['attachment']
            if file:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return jsonify({
            'message': 'Application received successfully',
            'status': 'success'
        }), 200

    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 500

@app.route('/api/licenses/type-d', methods=['POST'])
def type_d_license():
    try:
        # Get form data
        company_name = request.form.get('companyName')
        owner_name = request.form.get('ownerName')
        business_type = request.form.get('businessType')
        employee_count = request.form.get('employeeCount')
        annual_revenue = request.form.get('annualRevenue')
        
        # Handle file upload
        if 'attachment' in request.files:
            file = request.files['attachment']
            if file:
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        return jsonify({
            'message': 'Application received successfully',
            'status': 'success'
        }), 200

    except Exception as e:
        return jsonify({
            'message': str(e),
            'status': 'error'
        }), 500

@app.route('/api/applications/<application_id>', methods=['GET'])
def get_application_status(application_id):
    if application_id in applications:
        return jsonify(applications[application_id]), 200
    return jsonify({'message': 'Application not found'}), 404

@app.route('/api/applications/<application_id>/status', methods=['PUT'])
def update_application_status(application_id):
    if application_id not in applications:
        return jsonify({'message': 'Application not found'}), 404
    
    data = request.json
    new_status = data.get('status')
    comment = data.get('comment', '')

    applications[application_id]['status'] = new_status
    applications[application_id]['timeline'].append({
        'status': new_status,
        'date': datetime.datetime.now().isoformat(),
        'comment': comment
    })

    return jsonify({'message': 'Status updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)