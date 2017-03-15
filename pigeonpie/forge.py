""" App Authentication Singleton """
import requests
from collections import namedtuple
from pigeonpie import app, session

# Config
HOST = 'https://developer.api.autodesk.com/authentication/v1/'
SCOPE_FULL = 'data:write data:read bucket:create bucket:read bucket:delete'
SCOPE_USER = 'data:write data:read'

TOKEN_HEADER = {'Content-Type': 'application/x-www-form-urlencoded'}
URL_USER_GET_TOKEN = HOST + 'gettoken'
URL_USER_REFRESH_TOKEN = HOST + 'refreshtoken'
URL_APP_GET_TOKEN = HOST + 'authenticate'
URL_USER_PROFILE = 'https://developer.api.autodesk.com/userprofile/v1/users/@me'

JsonResponse = namedtuple('JsonResponse', ['json_data', 'response'])


def process_response(response):
    try:
        return JsonResponse(response.json(), response)
    except Exception as errmsg:
        app.logger.error('Error parsing response: {}'.format(response.reason))
        return JsonResponse({'message': response.text}, response)


class _ForgeUser(object):
    """ Forge User """

    def __init__(self):
        pass

    def login(self, code=None, refresh_token=None):
        url = URL_USER_GET_TOKEN
        self.data = {'client_id': app.config['FORGE_CLIENT_ID'],
                     'client_secret': app.config['FORGE_CLIENT_SECRET'],
                     'redirect_uri': app.config['FORGE_CALLBACK'],
                     'grant_type': 'authorization_code',
                     'code': code}

        if refresh_token:
            app.logger.info('Refreshing Token...')
            url = URL_USER_REFRESH_TOKEN
            self.data.pop('code')
            self.data.update({'refresh_token': refresh_token})

        response = requests.post(url, headers=TOKEN_HEADER, data=self.data)
        if response.status_code == 200:
            app.logger.info('FORGE USER: Authentication Successful.')
            session['access_token'] = response.json()['access_token']
            session['refresh_token'] = response.json()['refresh_token']
            session['user'] = self.get_user_profile()
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
            self.data = {'client_id': app.config['FORGE_CLIENT_ID'],
                         'client_secret': app.config['FORGE_CLIENT_SECRET'],
                         'grant_type': 'client_credentials',
                         'scope': SCOPE_FULL}

            self.default_header = {'Content-Type': 'application/json'}
            self.access_token = self.get_new_token()
            self.session = requests.Session()

        def request(self, method, *args, **kwargs):
            """ Inject Token and default header """
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
            response = requests.post(url, headers=TOKEN_HEADER, data=self.data)
            if response.status_code == 200:
                data = response.json()
                access_token = data['access_token']
                self.default_header.update({'Authorization': 'Bearer {}'.format(access_token)})
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
