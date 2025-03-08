from app import db

class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    project = db.Column(db.String(100), nullable=False)
    complaint_text = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='Pending')