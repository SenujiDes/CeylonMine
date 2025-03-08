from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)


    #connecting with the FE
    CORS(app, resources={r"/*": {"origins": "*"}})


    db.init_app(app)

    # Import and register Blueprints
    from app.auth.routes import auth_bp
    from app.complaints.routes import complaints_bp
    from app.royalty.routes import royalty_bp
    from app.main.routes import main_bp
    from app.license.routes import license_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(complaints_bp, url_prefix='/complaints')
    app.register_blueprint(royalty_bp, url_prefix='/royalty')
    app.register_blueprint(main_bp)
    app.register_blueprint(license_bp, url_prefix='/license')

    return app
