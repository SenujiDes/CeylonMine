from app import db

class License(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    license_number = db.Column(db.String(100), unique=True, nullable=False)
    license_type = db.Column(db.String(50), nullable=False)
    issue_date = db.Column(db.Date, nullable=False)
    expiry_date = db.Column(db.Date, nullable=False)
    holder_name = db.Column(db.String(100), nullable=False)

    def _repr_(self):
        return f"<License {self.license_number}>"
