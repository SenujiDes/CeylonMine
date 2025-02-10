from datetime import datetime
from app import db
from app.models import Application, StatusHistory

class StatusTracker:
    VALID_TRANSITIONS = {
        'pending_review': ['under_review', 'awaiting_correction'],
        'under_review': ['approved', 'rejected', 'awaiting_correction'],
        'awaiting_correction': ['pending_review'],
        'approved': ['license_issued'],
        'rejected': ['closed']
    }
    
    @staticmethod
    def can_transition(current_status: str, new_status: str) -> bool:
        return new_status in StatusTracker.VALID_TRANSITIONS.get(current_status, [])
    
    @staticmethod
    def update_status(application_id: int, new_status: str, comment: str = None) -> bool:
        application = Application.query.get(application_id)
        if not application:
            return False
            
        if not StatusTracker.can_transition(application.status, new_status):
            return False
            
        # Record status change
        history = StatusHistory(
            application_id=application_id,
            old_status=application.status,
            new_status=new_status,
            comment=comment,
            changed_at=datetime.utcnow()
        )
        
        application.status = new_status
        db.session.add(history)
        db.session.commit()
        
        return True 