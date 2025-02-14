from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Root route
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Flask API"})

# Test route to verify the server is running
@app.route('/api/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Flask server is running!"})

# Add more routes here as needed

if __name__ == '__main__':
    app.run(debug=True, port=5000) 