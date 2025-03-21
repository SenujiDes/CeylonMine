from flask import jsonify, request
from supabase import create_client, Client
from config import Config
from flask import Blueprint

minerpage_bp = Blueprint('minerpage', __name__, url_prefix='/miner')

# Initialize Supabase client
supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

@minerpage_bp.route('/status', methods=['GET'])
def get_user_status():
    # Assuming you have a way to identify the logged-in user, e.g., through a session or token
    user_id = request.args.get('user_id')  # You might get this from a session or token in a real scenario

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Fetch the status from the application table
    response = supabase.table('application').select('status').eq('user_id', user_id).execute()

    if response.data:
        return jsonify({"status": response.data[0]['status']}), 200
    else:
        return jsonify({"error": "User not found"}), 404

@minerpage_bp.route('/announcements', methods=['GET'])
def get_announcements():
    user_id = request.args.get('user_id')  # Again, get this from a session or token

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Fetch announcements from the comments table
    response = supabase.table('comments').select('announcement').eq('user_id', user_id).execute()

    if response.data:
        announcements = [item['announcement'] for item in response.data]
        return jsonify({"announcements": announcements}), 200
    else:
        return jsonify({"error": "No announcements found"}), 404

def init_routes(bp):
    bp.route('/status', methods=['GET'])(get_user_status)
    bp.route('/announcements', methods=['GET'])(get_announcements)

# In your create_app function, ensure the minerpage blueprint is registered
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/*": {"origins": "*"}})

    load_dotenv()
    supabase: Client = create_client(app.config['SUPABASE_URL'], app.config['SUPABASE_KEY'])
    app.supabase = supabase

    # Register the minerpage blueprint
    minerpage_bp = Blueprint('minerpage', __name__, url_prefix='/miner')
    init_routes(minerpage_bp)
    app.register_blueprint(minerpage_bp)

    return app
