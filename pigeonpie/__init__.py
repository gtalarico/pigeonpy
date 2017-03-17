import os
import logging
from flask import Flask, session
from flask_restful import Api

app = Flask(__name__)
app_api = Api(app)

from pigeonpie import config
from pigeonpie import assets
from pigeonpie import views, forge_routing

app.logger.info('>>> {}'.format(app.config['MODE']))

# Add logger
stream_handler = logging.StreamHandler()
stream_handler.setLevel(logging.WARNING)
app.logger.addHandler(stream_handler)
