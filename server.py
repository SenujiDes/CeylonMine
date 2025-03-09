from flask import Flask, jsonify, request
from flask_cors import CORS

# app instance
app = Flask(__name__)
CORS(app)

# Temporary storage (replace with a database in production)
users = []

#/api/home
@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message': "Hello World!"
    })

@app.route("/api/signup", methods=['POST'])
def signup():
    data = request.get_json()
    
    # Basic validation
    if not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Check if email already exists
    if any(user['email'] == data['email'] for user in users):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Store user (in production, hash the password and use a database)
    users.append({
        'name': data['name'],
        'email': data['email'],
        'password': data['password']
    })
    
    return jsonify({'message': 'User registered successfully'}), 201

if __name__ == "__main__":
    app.run(debug=True, port=8080)
    