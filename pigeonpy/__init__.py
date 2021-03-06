import os
import logging
from flask import Flask, session
from flask_restful import Api

app = Flask(__name__)
app_api = Api(app)

from pigeonpy import config
from pigeonpy import assets
from pigeonpy import views, forge_routing

app.logger.info('>>> {}'.format(app.config['MODE']))

# Add logger
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)
app.logger.addHandler(stream_handler)

# https://flask-socketio.readthedocs.io/en/latest/
# https://github.com/vinceprignano/chatapp
