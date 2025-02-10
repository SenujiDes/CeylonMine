from typing import Dict, List
from flask_mail import Mail, Message
from app import db
from app.models import User, Notification

mail = Mail()

class NotificationService:
    @staticmethod
    def send_email(recipient: str, subject: str, body: str):
        try:
            msg = Message(
                subject=subject,
                recipients=[recipient],
                body=body
            )
            mail.send(msg)
            return True
        except Exception as e:
            print(f"Email sending failed: {str(e)}")
            return False
    
    @staticmethod
    def create_notification(user_id: int, message: str, notification_type: str):
        notification = Notification(
            user_id=user_id,
            message=message,
            type=notification_type
        )
        db.session.add(notification)
        db.session.commit()
        return notification
    
    @staticmethod
    def notify_status_change(application_id: int, new_status: str):
        from app.models import Application
        
        application = Application.query.get(application_id)
        if not application:
            return False
            
        message = f"Your application #{application_id} status has been updated to {new_status}"
        
        # Create in-app notification
        NotificationService.create_notification(
            application.user_id,
            message,
            'status_update'
        )
        
        # Send email
        user = User.query.get(application.user_id)
        if user:
            NotificationService.send_email(
                user.email,
                "Application Status Update",
                message
            )
        
        return True 