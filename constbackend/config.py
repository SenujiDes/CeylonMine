import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Using SQLite instead of PostgreSQL
    SQLALCHEMY_DATABASE_URI = 'sqlite:///royalty_calculator.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Remove PostgreSQL specific settings
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_recycle': 1800,
    } 