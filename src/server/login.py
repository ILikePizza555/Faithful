from google.oauth2 import id_token
from google.auth.transport import requests

def validate_token(token, client_id):
    id_info = id_token.verify_oauth2_token(token, requests.Request(), client_id)

    if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        raise ValueError('Wrong issuer.')
    
    return id_info