""" App Authentication Singleton """
import requests

from pigeonpie import app

# Config
token_url = 'https://developer.api.autodesk.com/authentication/v1/authenticate'
scope_full = 'data:write data:read bucket:create bucket:read bucket:delete'
token_header = {'Content-Type': 'application/x-www-form-urlencoded'}


class Forge(object):
    """ Forge Singleton """

    class _Forge(object):

        def __init__(self, scope=scope_full):
            self.data = {'client_id': app.config['AD_CLIENT_ID'],
                         'client_secret': app.config['AD_CLIENT_SECRET'],
                         'grant_type': 'client_credentials',
                         'scope': scope}
            self.token = self.get_new_token()

            access_token = self.token.get('access_token')
            default_header = {'Content-Type': 'application/json',
                              'Authorization': 'Bearer {}'.format(access_token)}

            self.session = requests.Session()
            self.session.headers.update(default_header)

        def get_new_token(self):
            req = requests.post(token_url, headers=token_header, data=self.data)
            if req.status_code == 200:
                app.logger.info('Forge Authentication Token Successful.')
                return req.json()

    instance = None
    def __init__(self):
        if not Forge.instance:
            Forge.instance = Forge._Forge()

    def __getattr__(self, name):
        return getattr(self.instance, name)
