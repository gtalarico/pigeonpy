""" App Authentication Singleton """
import os
import requests
from collections import namedtuple
from datetime import datetime, timedelta

from pigeonpy import app, session

# Config
HOST = 'https://developer.api.autodesk.com/authentication/v1/'
SCOPE_FULL = 'data:write data:read bucket:create bucket:read bucket:delete'
SCOPE_USER = 'data:read'

TOKEN_HEADER = {'Content-Type': 'application/x-www-form-urlencoded'}
URL_USER_GET_TOKEN = HOST + 'gettoken'
URL_USER_REFRESH_TOKEN = HOST + 'refreshtoken'
URL_APP_GET_TOKEN = HOST + 'authenticate'
URL_USER_PROFILE = 'https://developer.api.autodesk.com/userprofile/v1/users/@me'

JsonResponse = namedtuple('JsonResponse', ['json_data', 'response'])


def process_response(response):
    """ Creates named tupple (json_data, response) """
    try:
        return JsonResponse(response.json(), response)
    except Exception as errmsg:
        app.logger.error('Error parsing response: {}'.format(response.reason))
        return JsonResponse({'message': response.text}, response)


def process_expires_in(timestamp):
    """ Returns datetime objects of when token will expire """
    now = datetime.now()
    expiration = now + timedelta(seconds=timestamp)
    return expiration


class _ForgeUser(object):
    """ Forge User """

    def __init__(self):
        pass

    def login(self, code=None, refresh_token=None):
        url = URL_USER_GET_TOKEN
        login_payload = {'client_id': app.config['FORGE_CLIENT_ID'],
                         'client_secret': app.config['FORGE_CLIENT_SECRET'],
                         'redirect_uri': app.config['FORGE_CALLBACK'],
                         'grant_type': 'authorization_code',
                         'code': code}

        if refresh_token:
            # TODO: Save + Use Expiration time instead of trial and error
            app.logger.info('Refreshing Token...')
            url = URL_USER_REFRESH_TOKEN
            # Replaces Code with RefreshToken
            login_payload.pop('code')
            login_payload.update({'refresh_token': refresh_token})

        response = requests.post(url, headers=TOKEN_HEADER, data=login_payload)
        if response.status_code == 200:
            app.logger.info('FORGE USER: Authentication Successful.')
            session['access_token'] = response.json()['access_token']
            session['refresh_token'] = response.json()['refresh_token']
            session['user'] = {}
            session['user']['profile'] = self.get_user_profile()
            if session['user']['profile']['emailId'] == app.config['FORGE_ADMIN']:
                is_admin = True
            else:
                is_admin = False
            session['user']['is_admin'] = is_admin
            return True

        else:
            app.logger.error('FORGE USER: Authentication failed: {}'.format(response.reason))
            self.logout()

    def logout(self):
        app.logger.info('User has been logged out')
        session.pop('access_token', None)
        session.pop('refresh_token', None)
        session.pop('user', None)

    def request(self, method, *args, **kwargs):
        """ Inject Token and default header """
        access_token = session.get('access_token')
        default_headers = {'Authorization': 'Bearer {}'.format(access_token)}
        if method != 'get':
            default_headers.update({'Content-Type': 'application/json'})
        requests_session = requests.Session()
        requests_session.headers.update(default_headers)
        selected_method = getattr(requests_session, method)

        attempts = 0
        while attempts <= 1:
            response = selected_method(*args, **kwargs)
            if response.status_code == 401:
                app.logger.info('Refreshing token...')
                self.login(refresh_token=session.get('refresh_token'))
            attempts += 1

        return process_response(response)

    def get_user_profile(self):
        json_data, response = ForgeUser.request('get', URL_USER_PROFILE)
        app.logger.info('User profile acquired.')
        return json_data

    @property
    def is_authenticated(self):
        return True if session.get('access_token') else False


class _ForgeApp(object):
    """ Forge Application Singleton """

    class __ForgeApp(object):

        def __init__(self):
            self.auth_payload = {'client_id': app.config['FORGE_CLIENT_ID'],
                                 'client_secret': app.config['FORGE_CLIENT_SECRET'],
                                 'grant_type': 'client_credentials',
                                 'scope': SCOPE_FULL}

            self.default_header = {'Content-Type': 'application/json'}
            self.access_token = self.get_new_token()
            self.session = requests.Session()

        def request(self, method, *args, **kwargs):
            """ Inject Token and default header """
            if datetime.now() > self.expiration:
                self.deauthorize()
                app.logger.info('FORGE APP: Token has Expired. Renewing')
                self.get_new_token()

            self.session.headers.update(self.default_header)
            selected_method = getattr(self.session, method)
            response = selected_method(*args, **kwargs)
            attempts = 0
            while attempts <= 1:
                if response == 401:
                    self.access_token = None
                    self.get_new_token()
                attempts += 1

            return process_response(response)

        def get_new_token(self):
            url = URL_APP_GET_TOKEN
            response = requests.post(url, headers=TOKEN_HEADER, data=self.auth_payload)
            if response.status_code == 200:
                token_data = response.json()
                access_token = token_data['access_token']
                self.default_header.update({'Authorization': 'Bearer {}'.format(access_token)})
                self.expiration = process_expires_in(token_data['expires_in'])
                app.logger.info('FORGE APP: Authentication Successful.')
                return access_token

        def deauthorize(self):
            self.access_token = None

        @property
        def is_authenticated(self):
            return True if self.access_token else False

    instance = None
    def __init__(self):
        if not _ForgeApp.instance:
            _ForgeApp.instance = _ForgeApp.__ForgeApp()

    def __getattr__(self, name):
        return getattr(self.instance, name)

ForgeUser = _ForgeUser()
ForgeApp = _ForgeApp()
