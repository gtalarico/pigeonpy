import os
from pigeonpy import app

class Config(object):
    MODE = 'Config'
    DEBUG = False
    TESTING = False
    STAGING = False
    PRODUCTION = False
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    TEMPLATEDIR = os.path.join(BASEDIR, 'templates')
    SECRET_KEY = os.environ['SECRET_KEY']

    ASSETS_DEBUG = True if os.getenv('ASSETS_DEBUG') == '1' else False

    FORGE_CLIENT_ID = os.environ['FORGE_CLIENT_ID']
    FORGE_CLIENT_SECRET = os.environ['FORGE_CLIENT_SECRET']
    FORGE_CALLBACK = os.environ['FORGE_CALLBACK']
    FORGE_ADMIN = os.environ['FORGE_ADMIN']


class Development(Config):
    MODE = 'Development'
    DEBUG = True


class Production(Config):
    MODE = 'Production'

flask_config = os.environ['FLASK_CONFIG']
app.config.from_object('pigeonpy.config.{}'.format(flask_config))
