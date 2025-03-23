from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

# In-memory storage for users (replace with database in production)
users = {
    'admin@example.com': {
        'id': 1,
        'email': 'admin@example.com',
        'password': 'admin123',  # In production, this should be hashed
        'role': 'admin',
        'is_active': True
    }
}

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            token = token.split(' ')[1]
            data = jwt.decode(token, 'your-secret-key', algorithms=['HS256'])
            if data['role'] != 'admin':
                return jsonify({'message': 'Admin access required'}), 403
        except:
            return jsonify({'message': 'Invalid token'}), 401
            
        return f(*args, **kwargs)
    return decorated

@admin_bp.route('/users/<int:user_id>/status', methods=['PUT'])
@admin_required
def update_user_status(user_id):
    data = request.json
    new_status = data.get('is_active')
    
    if new_status is None:
        return jsonify({'message': 'Status field is required'}), 400
    
    # Find user by ID (in production, this would be a database query)
    user = None
    for u in users.values():
        if u['id'] == user_id:
            user = u
            break
    
    if not user:
        return jsonify({'message': 'User not found'}), 404
    
    # Update user status
    user['is_active'] = new_status
    
    return jsonify({
        'message': 'User status updated successfully',
        'user': {
            'id': user['id'],
            'email': user['email'],
            'is_active': user['is_active']
        }
    })

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    # In production, this would be paginated and filtered
    user_list = [
        {
            'id': user['id'],
            'email': user['email'],
            'role': user['role'],
            'is_active': user['is_active']
        }
        for user in users.values()
    ]
    
    return jsonify({
        'users': user_list
    }) 