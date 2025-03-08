from app import db
from datetime import datetime

class RoyaltyCalculation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calculation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    water_gel = db.Column(db.Float, nullable=False)
    nh4no3 = db.Column(db.Float, nullable=False)
    powder_factor = db.Column(db.Float, nullable=False)
    total_explosive_quantity = db.Column(db.Float, nullable=False)
    blasted_rock_volume = db.Column(db.Float, nullable=False)
    base_royalty = db.Column(db.Float, nullable=False)
    royalty_with_sscl = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)