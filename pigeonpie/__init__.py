import os
from flask import Flask
from flask_restful import Api

app = Flask(__name__)
app_api = Api(app)

from pigeonpie import config
from pigeonpie import assets
from pigeonpie import views, api
