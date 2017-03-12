from flask import request
import requests

from pigeonpie import app

URL = 'https://developer.api.autodesk.com/authentication/v1/authenticate'
HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'}
DATA = {'client_id': app.config['AD_CLIENT_ID'],
        'client_secret': app.config['AD_CLIENT_SECRET'],
        'grant_type': 'client_credentials',
        'scope': 'data:write data:read bucket:create bucket:read'
        }

r = requests.post(URL, headers=HEADERS, data=DATA)

if r.status_code == 200:
    print('Request: {}'.format(r.json()))
    token = r.json().get('access_token')
else:
    raise Exception("Authorization Failure")
