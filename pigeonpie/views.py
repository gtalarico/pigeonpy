from flask import render_template, redirect, request, url_for
from werkzeug.urls import url_encode

from pigeonpie import app
from pigeonpie.forge import ForgeUser, SCOPE_USER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user/login')
def login():
    redirect_url = request.args.get('redirect', '/')
    params = {'client_id': app.config['FORGE_CLIENT_ID'],
              'redirect_uri': app.config['FORGE_CALLBACK'],
              'scope': SCOPE_USER,
              'state': redirect_url,
              'response_type': 'code'}

    url = 'https://developer.api.autodesk.com/authentication/v1/authorize?{}'.format(url_encode(params))
    return redirect(url, code=303)

@app.route('/logout')
def logout():
    """ Authentication endpoint """
    ForgeUser.logout()
    return redirect(url_for('index'))

#############################
# AUTHENTICATION END POINTS #
#############################

@app.route('/api/callback')
def callback_authentication():
    """ Authentication endpoint """
    code = request.args.get('code')
    target = request.args.get('state', '/')
    if not ForgeUser.login(code=code):
        code = 401
    return redirect(target)
