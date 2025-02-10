from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import Config

class DatabaseConnection:
    _engine = None
    _Session = None

    @classmethod
    def initialize(cls):
        if not cls._engine:
            cls._engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
            cls._Session = sessionmaker(bind=cls._engine)

    @classmethod
    @contextmanager
    def get_session(cls):
        if not cls._Session:
            cls.initialize()
        
        session = cls._Session()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close() 