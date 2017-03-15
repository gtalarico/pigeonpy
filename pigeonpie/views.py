from flask import render_template, request, url_for, redirect

from pigeonpie import app, session
from pigeonpie.forge import SCOPE_USER, ForgeUser


@app.route('/')
def index():
    return render_template('index.html',
                           client_id=app.config['FORGE_CLIENT_ID'],
                           callback=app.config['FORGE_CALLBACK'],
                           scope=SCOPE_USER)
