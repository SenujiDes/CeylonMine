from typing import List, Dict
import magic
import os

class DocumentValidator:
    ALLOWED_MIME_TYPES = {
        'application/pdf': '.pdf',
        'image/jpeg': '.jpg',
        'image/png': '.png'
    }
    
    REQUIRED_DOCUMENTS = {
        'mining_license': [
            'identification_proof',
            'land_ownership_proof',
            'environmental_assessment',
            'technical_proposal'
        ]
    }
    
    @staticmethod
    def validate_document(file) -> Dict:
        mime = magic.from_buffer(file.read(2048), mime=True)
        file.seek(0)  # Reset file pointer
        
        if mime not in DocumentValidator.ALLOWED_MIME_TYPES:
            return {'valid': False, 'error': 'Invalid file type'}
            
        return {'valid': True, 'extension': DocumentValidator.ALLOWED_MIME_TYPES[mime]}
    
    @staticmethod
    def check_required_documents(license_type: str, submitted_docs: List[str]) -> Dict:
        required = set(DocumentValidator.REQUIRED_DOCUMENTS.get(license_type, []))
        submitted = set(submitted_docs)
        missing = required - submitted
        
        return {
            'complete': len(missing) == 0,
            'missing_documents': list(missing)
        } 