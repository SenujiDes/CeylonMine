# from flask import Flask, Blueprint
# from flask_cors import CORS
# from supabase import create_client, Client
# from config import Config
# from dotenv import load_dotenv
# import complain
# import royalty
# import license
# import map
# import contact

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)

#     # Enable CORS for all routes
#     CORS(app, resources={r"/*": {"origins": "*"}})

#     # Initialize Supabase client
#     load_dotenv()  # Load environment variables from .env file
#     supabase: Client = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])
#     app.supabase = supabase  # Attach Supabase client to the app

#     # Create and register Blueprints
#     complaints_bp = Blueprint('complaints', __name__, url_prefix='/complaints')
#     royalty_bp = Blueprint('royalty', __name__, url_prefix='/royalty')
#     license_bp = Blueprint('license', __name__, url_prefix='/license')
#     map_bp = Blueprint('map',__name__, url_prefix='/map')
#     contact_bp = Blueprint('contact', __name__,url_prefix='/contact')

#     # Register the routes with the blueprints
#     complain.init_routes(complaints_bp)
#     royalty.init_routes(royalty_bp)
#     license.init_routes(license_bp)
#     map.init_routes(map_bp)
#     contact.init_routes(contact_bp)

#     # Register blueprints with the app
#     app.register_blueprint(complaints_bp)
#     app.register_blueprint(royalty_bp)
#     app.register_blueprint(license_bp)
#     app.register_blueprint(map_bp)
#     app.register_blueprint(contact_bp)

#     return app

from flask import Flask
from flask_cors import CORS
from supabase import create_client
import os
from config import Config

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Load configuration from Config class
    app.config.from_object(Config)
    
    # Initialize Supabase client
    app.supabase = create_client(
        app.config['SUPABASE_URL'],
        app.config['SUPABASE_KEY']
    )
    
    # Register blueprints for different routes
    from flask import Blueprint
    
    # Map routes
    map_bp = Blueprint('map', __name__, url_prefix='/api/map')
    from map import init_routes as init_map_routes
    init_map_routes(map_bp)
    app.register_blueprint(map_bp)
    
    # Contact routes
    contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')
    from contact import init_routes as init_contact_routes
    init_contact_routes(contact_bp)
    app.register_blueprint(contact_bp)
    
    # Complaint routes
    complain_bp = Blueprint('complain', __name__, url_prefix='/api/complain')
    from complain import init_routes as init_complain_routes
    init_complain_routes(complain_bp)
    app.register_blueprint(complain_bp)
    
    # License routes
    license_bp = Blueprint('license', __name__, url_prefix='/api/license')
    from license import init_routes as init_license_routes
    init_license_routes(license_bp)
    app.register_blueprint(license_bp)
    
    # Royalty routes
    royalty_bp = Blueprint('royalty', __name__, url_prefix='/api/royalty')
    from royalty import init_routes as init_royalty_routes
    init_royalty_routes(royalty_bp)
    app.register_blueprint(royalty_bp)
    
    # Add a simple home route
    @app.route('/')
    def home():
        return 'Mining Management API is running! Available endpoints: /api/map, /api/contact, /api/complain, /api/license, /api/royalty'
    
    return app