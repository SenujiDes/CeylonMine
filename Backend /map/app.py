# from flask import Flask, jsonify
# from flask_cors import CORS
# import psycopg2

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Database connection
# def get_db_connection():
#     conn = psycopg2.connect(
#         host='localhost',
#         database='mineLocation',
#         user='postgres',
#         password='1234'
#     )
#     return conn

# # Root endpoint for testing purposes
# @app.route('/', methods=['GET'])
# def index():
#     return "Welcome to the Locations API!"
 


# # API endpoint to fetch locations
# @app.route('/locations', methods=['GET'])
# def get_locations():
#     conn = get_db_connection()
#     cur = conn.cursor()
#     cur.execute('SELECT * FROM locations;')
#     locations = cur.fetchall()
#     cur.close()
#     conn.close()

#     # Convert to a list of dictionaries
#     locations_list = []
#     for location in locations:
#         locations_list.append({
#             'id': location[0],
#             'name': location[1],
#             'latitude': float(location[2]),
#             'longitude': float(location[3]),
#             'description': location[4]
#         })

#     return jsonify(locations_list)

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection function
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='mineLocation',
        user='postgres',
        password='1234'
    )
    return conn

# Root endpoint
@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Locations API!"

# API endpoint to fetch locations
@app.route('/locations', methods=['GET'])
def get_locations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM locations;')
    locations = cur.fetchall()
    cur.close()
    conn.close()

    # Convert to a list of dictionaries
    locations_list = []
    for location in locations:
        locations_list.append({
            'id': location[0],
            'name': location[1],
            'latitude': float(location[2]),
            'longitude': float(location[3]),
            'description': location[4],
            'image': location[5],
            'longDes': location[6],
        })

    print("Returning locations:", locations_list)  # Debugging output

    return jsonify(locations_list)

if __name__ == '__main__':
    app.run(debug=True)
