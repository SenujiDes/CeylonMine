class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost:5432/mining_license_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key' 