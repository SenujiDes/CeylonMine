from flask import Flask, Blueprint
from flask_cors import CORS
from supabase import create_client, Client
from config import Config
from dotenv import load_dotenv
import complain
import royalty
import license
import map
import contact

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Initialize Supabase client
    load_dotenv()  # Load environment variables from .env file
    supabase: Client = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])
    app.supabase = supabase  # Attach Supabase client to the app

    # Create and register Blueprints
    complaints_bp = Blueprint('complaints', __name__, url_prefix='/complaints')
    royalty_bp = Blueprint('royalty', __name__, url_prefix='/royalty')
    license_bp = Blueprint('license', __name__, url_prefix='/license')
    map_bp = Blueprint('map',__name__, url_prefix='/map')
    contact_bp = Blueprint('contact', __name__,url_prefix='/contact')

    # Register the routes with the blueprints
    complain.init_routes(complaints_bp)
    royalty.init_routes(royalty_bp)
    license.init_routes(license_bp)
    map.init_routes(map_bp)
    contact.init_routes(contact_bp)

    # Register blueprints with the app
    app.register_blueprint(complaints_bp)
    app.register_blueprint(royalty_bp)
    app.register_blueprint(license_bp)
    app.register_blueprint(map_bp)
    app.register_blueprint(contact_bp)

    return app
