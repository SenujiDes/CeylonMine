from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

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

        # Here you would typically:
        # 1. Validate the data
        # 2. Save to database
        # 3. Process the application
        
        return jsonify({
            'message': 'Application received successfully',
            'status': 'success'
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

if __name__ == '__main__':
    app.run(debug=True)