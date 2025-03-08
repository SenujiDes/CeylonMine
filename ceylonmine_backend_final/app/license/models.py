from app import db
from datetime import datetime

class IndustrialMiningLicense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exploration_license_no = db.Column(db.String(100), nullable=True)

    # Individual Applicant Details
    applicant_name = db.Column(db.String(100), nullable=False)
    national_id = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    employment = db.Column(db.String(100), nullable=True)
    place_of_business = db.Column(db.String(200), nullable=True)
    residence = db.Column(db.String(200), nullable=True)

    # Corporation Details
    company_name = db.Column(db.String(100), nullable=True)
    country_of_incorporation = db.Column(db.String(100), nullable=True)
    head_office_address = db.Column(db.String(200), nullable=True)
    registered_address_in_sri_lanka = db.Column(db.String(200), nullable=True)
    capitalization = db.Column(db.String(100), nullable=True)
    articles_of_association = db.Column(db.String(200), nullable=True)  # File path or reference
    annual_reports = db.Column(db.String(200), nullable=True)  # File path or reference

    # Technical/Professional Data
    licensed_boundary_survey = db.Column(db.String(200), nullable=True)  # File path or reference
    project_team_credentials = db.Column(db.String(200), nullable=True)  # File path or reference
    economic_viability_report = db.Column(db.String(200), nullable=True)  # File path or reference

    # Mining Operation Details
    blasting_method = db.Column(db.String(100), nullable=True)
    depth_of_borehole = db.Column(db.String(50), nullable=True)
    production_volume = db.Column(db.String(50), nullable=True)
    machinery_used = db.Column(db.String(200), nullable=True)
    underground_mining_depth = db.Column(db.String(50), nullable=True)
    explosives_type = db.Column(db.String(100), nullable=True)

    # License Area Details
    land_name = db.Column(db.String(100), nullable=True)
    land_owner_name = db.Column(db.String(100), nullable=True)
    village_name = db.Column(db.String(100), nullable=True)
    grama_niladhari_division = db.Column(db.String(100), nullable=True)
    divisional_secretary_division = db.Column(db.String(100), nullable=True)
    administrative_district = db.Column(db.String(100), nullable=True)

    # Mine Restoration Plan
    mine_restoration_plan = db.Column(db.String(200), nullable=True)  # File path or reference

    # Nature of Amount of Bound
    nature_of_bound = db.Column(db.String(100), nullable=True)

    # Minerals to be Mined
    minerals_to_be_mined = db.Column(db.String(200), nullable=True)

    # License Fee Receipt
    license_fee_receipt = db.Column(db.String(200), nullable=True)  # File path or reference

    # Certification and Authorization
    applicant_signature = db.Column(db.String(200), nullable=True)  # File path or reference
    mine_manager_signature = db.Column(db.String(200), nullable=True)  # File path or reference
    industrial_mining_license_no = db.Column(db.String(100), nullable=True)
    period_of_validity = db.Column(db.String(50), nullable=True)
    royalty_payable = db.Column(db.String(50), nullable=True)
    director_general_signature = db.Column(db.String(200), nullable=True)  # File path or reference
    application_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<IndustrialMiningLicense {self.id}>"