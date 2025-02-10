from flask import Flask
from flask_migrate import Migrate
from app import create_app, db

app = create_app()
migrate = Migrate(app, db)

# Initialize migrations
with app.app_context():
    if db.engine.url.drivername == 'postgresql':
        import sqlalchemy as sa
        sa.text('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"') 