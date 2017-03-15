from werkzeug.urls import url_encode
from flask import render_template, request, url_for, redirect

from pigeonpie import app, session
from pigeonpie.forge import SCOPE_USER, ForgeUser


@app.route('/')
def index():
    params = {'client_id': app.config['FORGE_CLIENT_ID'],
              'redirect_uri': app.config['FORGE_CALLBACK'],
              'scope': SCOPE_USER,
              'state': '/',
              'response_type': 'code'
             }
    url = 'https://developer.api.autodesk.com/authentication/v1/authorize?{}'.format(url_encode(params))
    # params = 'response_type=code&client_id={client_id}&redirect_uri={callback}&scope={scope}&state=/'.format(client_id=client_id, callback=callback, scope=scope)

    # import pdb; pdb.set_trace()
    return render_template('index.html', login_url=url)
