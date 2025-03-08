from app import create_app, db

app = create_app()

# Create database tables
with app.app_context():
    db.create_all()  # Create all tables
    print("Database tables created successfully!")

if __name__ == '__main__':
    app.run(debug=True)