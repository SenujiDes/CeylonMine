from app import db
from app.models import Application, Document, User
from sqlalchemy.exc import SQLAlchemyError
from typing import Optional, List

class DatabaseManager:
    @staticmethod
    def create_application(user_id: int, license_type: str) -> Optional[Application]:
        try:
            application = Application(
                user_id=user_id,
                license_type=license_type
            )
            db.session.add(application)
            db.session.commit()
            return application
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error creating application: {str(e)}")
            return None

    @staticmethod
    def add_document(application_id: int, document_type: str, file_path: str) -> Optional[Document]:
        try:
            document = Document(
                application_id=application_id,
                document_type=document_type,
                file_path=file_path
            )
            db.session.add(document)
            db.session.commit()
            return document
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error adding document: {str(e)}")
            return None

    @staticmethod
    def get_pending_applications() -> List[Application]:
        return Application.query.filter_by(status='pending_review').all()

    @staticmethod
    def update_application_status(application_id: int, new_status: str) -> bool:
        try:
            application = Application.query.get(application_id)
            if application:
                application.status = new_status
                db.session.commit()
                return True
            return False
        except SQLAlchemyError as e:
            db.session.rollback()
            print(f"Error updating application status: {str(e)}")
            return False 