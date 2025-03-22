import logging

logger = logging.getLogger(__name__)

def handle_supabase_response(response, success_message="Operation successful", error_message="Operation failed"):
    """
    Utility function to handle responses from Supabase consistently
    
    Args:
        response: The response object from Supabase
        success_message: Message to return on success
        error_message: Message to return on error
        
    Returns:
        tuple: (data/error_dict, status_code)
    """
    logger.debug(f"Processing Supabase response: {response}")
    
    try:
        # Check if response exists and has data
        if response and hasattr(response, 'data'):
            # Check if there's an error field in the response data
            if hasattr(response, 'error') and response.error:
                logger.error(f"Supabase returned an error: {response.error}")
                return {"error": error_message, "details": response.error}, 400
            
            # Check if data exists and is not empty
            if response.data:
                return {"message": success_message, "data": response.data}, 200
            else:
                # Empty data might be ok in some cases (like deletion)
                return {"message": success_message}, 200
        else:
            logger.error(f"Invalid response from Supabase: {response}")
            return {"error": error_message}, 400
    except Exception as e:
        logger.exception(f"Error processing Supabase response: {e}")
        return {"error": f"{error_message}: {str(e)}"}, 500