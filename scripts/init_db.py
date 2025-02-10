from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app.models import *
import os


def init_db():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db = SQLAlchemy(app)
    
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Create initial admin user
        admin = User(
            username='admin',
            email='admin@mining.gov',
            role='main_office_staff'
        )
        admin.set_password('admin123')  # Implement set_password method in User model
        
        db.session.add(admin)
        db.session.commit()

if __name__ == '__main__':
    init_db() 