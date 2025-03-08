from flask import Blueprint, request, jsonify
from app.license.models import IndustrialMiningLicense
from app import db

license_bp = Blueprint('license', __name__)

@license_bp.route('/submit_application', methods=['POST'])
def submit_application():
    try:
        data = request.json

        # Create a new IndustrialMiningLicense object
        new_application = IndustrialMiningLicense(
            exploration_license_no=data.get('exploration_license_no'),
            applicant_name=data.get('applicant_name'),
            national_id=data.get('national_id'),
            address=data.get('address'),
            nationality=data.get('nationality'),
            employment=data.get('employment'),
            place_of_business=data.get('place_of_business'),
            residence=data.get('residence'),
            company_name=data.get('company_name'),
            country_of_incorporation=data.get('country_of_incorporation'),
            head_office_address=data.get('head_office_address'),
            registered_address_in_sri_lanka=data.get('registered_address_in_sri_lanka'),
            capitalization=data.get('capitalization'),
            articles_of_association=data.get('articles_of_association'),
            annual_reports=data.get('annual_reports'),
            licensed_boundary_survey=data.get('licensed_boundary_survey'),
            project_team_credentials=data.get('project_team_credentials'),
            economic_viability_report=data.get('economic_viability_report'),
            blasting_method=data.get('blasting_method'),
            depth_of_borehole=data.get('depth_of_borehole'),
            production_volume=data.get('production_volume'),
            machinery_used=data.get('machinery_used'),
            underground_mining_depth=data.get('underground_mining_depth'),
            explosives_type=data.get('explosives_type'),
            land_name=data.get('land_name'),
            land_owner_name=data.get('land_owner_name'),
            village_name=data.get('village_name'),
            grama_niladhari_division=data.get('grama_niladhari_division'),
            divisional_secretary_division=data.get('divisional_secretary_division'),
            administrative_district=data.get('administrative_district'),
            mine_restoration_plan=data.get('mine_restoration_plan'),
            nature_of_bound=data.get('nature_of_bound'),
            minerals_to_be_mined=data.get('minerals_to_be_mined'),
            license_fee_receipt=data.get('license_fee_receipt'),
            applicant_signature=data.get('applicant_signature'),
            mine_manager_signature=data.get('mine_manager_signature'),
            industrial_mining_license_no=data.get('industrial_mining_license_no'),
            period_of_validity=data.get('period_of_validity'),
            royalty_payable=data.get('royalty_payable'),
            director_general_signature=data.get('director_general_signature')
        )

        # Save to the database
        db.session.add(new_application)
        db.session.commit()

        return jsonify({"message": "Application submitted successfully!", "id": new_application.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@license_bp.route('/get_applications', methods=['GET'])
def get_applications():
    try:
        applications = IndustrialMiningLicense.query.all()
        return jsonify([{
            "id": app.id,
            "applicant_name": app.applicant_name,
            "company_name": app.company_name,
            "application_date": app.application_date
        } for app in applications]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500