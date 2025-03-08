from flask import Blueprint, jsonify, request
from app.complaints.models import Complaint
from app import db

complaints_bp = Blueprint('complaints', __name__)

@complaints_bp.route('/submit', methods=['POST'])
def submit_complaint():
    # Handle complaint submission
    data = request.json
    complaint = Complaint(email=data['email'], project=data['project'], complaint_text=data['complaint_text'])
    db.session.add(complaint)
    db.session.commit()
    return jsonify({'message': 'Complaint submitted successfully'}), 201

@complaints_bp.route('/get', methods=['GET'])
def get_complaints():
    # Fetch all complaints
    complaints = Complaint.query.all()
    return jsonify([{'id': c.id, 'email': c.email, 'project': c.project, 'complaint_text': c.complaint_text} for c in complaints]), 200