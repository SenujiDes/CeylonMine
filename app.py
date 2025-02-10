import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import text
from email_validator import validate_email, EmailNotValidError


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],  # Add your frontend domains
        "methods": ["GET", "POST","PUT","DELETE"],
        "allow_headers": ["Content-Type"]
    }
})

# Use environment variables for database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://postgres:minsi@localhost/sdgp')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Complaint Model
class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    project = db.Column(db.String(100), nullable=False)
    complaint_text = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Pending')

# Test database connection
def test_db_connection():
    try:
        with app.app_context():
            db.session.execute(text('SELECT 1'))
        return True
    except Exception as e:
        app.logger.error(f"Database connection error: {str(e)}")
        return False

# Create the database tables
with app.app_context():
    try:
        db.drop_all()  # This will delete all existing data
        db.create_all()
        print("Database tables recreated successfully!")
    except Exception as e:
        print(f"Error recreating database tables: {str(e)}")
        raise

if not test_db_connection():
    raise Exception("Could not connect to database")

# API Endpoint to Submit a Complaint from a form
@app.route('/submit_complaint', methods=['POST'])
def submit_complaint():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate required fields
        required_fields = ['project', 'complaint']
        for field in required_fields:
            if field not in data or not data[field].strip():
                return jsonify({"error": f"Missing or empty required field: {field}"}), 400

        # If email is provided, validate it
        if data.get("anonymous") and data["anonymous"] is True:
            email = "Anonymous"  # If anonymous, treat the email as "Anonymous"
        else:
            email = data.get("email", "").strip()
            if email:  # Validate email only if it's provided and not anonymous
                try:
                    validate_email(email)
                except EmailNotValidError:
                    return jsonify({"error": "Invalid email format"}), 400
            else:
                email = "Anonymous"  # Treat as anonymous if no email provided
            
        # Validate text lengths
        if len(data['project']) > 100:
            return jsonify({"error": "Project name too long (max 100 characters)"}), 400
            
        if len(data['complaint']) < 10:
            return jsonify({"error": "Complaint text too short (min 10 characters)"}), 400
        
        new_complaint = Complaint(
            email=email,
            project=data['project'].strip(),
            complaint_text=data['complaint'].strip()
        )
        db.session.add(new_complaint)
        db.session.commit()
        return jsonify({"message": "Complaint submitted successfully!", "id": new_complaint.id}), 201
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error submitting complaint: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request"}), 500

# API Endpoint to Fetch All Complaints to the admin page
@app.route('/get_complaints', methods=['GET'])
def get_complaints():
    try:
        complaints = Complaint.query.all()
        return jsonify([
            {
                "id": c.id,
                "email": c.email,
                "project": c.project,
                "complaint_text": c.complaint_text,
                "status": c.status
            }
            for c in complaints
        ])
    except Exception as e:
        app.logger.error(f"Error fetching complaints: {str(e)}")
        return jsonify({"error": "An error occurred while fetching complaints"}), 500

# Update a complaint in admin page
@app.route('/update_complaint/<int:id>', methods=['PUT'])
def update_complaint(id):
    try:
        data = request.json
        complaint = db.session.get(Complaint, id)  # Using the newer SQLAlchemy syntax
        if not complaint:
            return jsonify({'error': 'Complaint not found'}), 404

        if 'status' in data:
            # Validate status value
            valid_statuses = ["Pending", "Resolved", "Rejected"]
            if data['status'] not in valid_statuses:
                return jsonify({'error': 'Invalid status value'}), 400
            complaint.status = data['status']
        
        db.session.commit()
        return jsonify({
            'message': 'Complaint updated successfully',
            'complaint': {
                'id': complaint.id,
                'status': complaint.status
            }
        })
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error updating complaint: {str(e)}")
        return jsonify({'error': 'An error occurred while updating the complaint'}), 500

# Delete a complaint in admin page
@app.route('/delete_complaint/<int:id>', methods=['DELETE'])
def delete_complaint(id):
    complaint = Complaint.query.get(id)
    if not complaint:
        return jsonify({'error': 'Complaint not found'}), 404
    
    db.session.delete(complaint)
    db.session.commit()
    return jsonify({'message': 'Complaint deleted successfully'})

if __name__ == '__main__':
    app.run()
