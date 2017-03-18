import os
import logging
from flask import Flask, session
from flask_restful import Api

app = Flask(__name__)
app_api = Api(app)

from pigeonpie import config
app.logger.info('>>> {}'.format(app.config['MODE']))


from pigeonpie import assets
from pigeonpie import views, forge_routing


# Add logger
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.INFO)
app.logger.addHandler(stream_handler)

# https://flask-socketio.readthedocs.io/en/latest/
# https://github.com/vinceprignano/chatapp
