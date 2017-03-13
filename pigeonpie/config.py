import os
from pigeonpie import app

class Config(object):
    DEBUG = False
    TESTING = False
    STAGING = False
    PRODUCTION = False
    BASEDIR = os.path.abspath(os.path.dirname(__file__))
    TEMPLATEDIR = os.path.join(BASEDIR, 'templates')

    ASSETS_DEBUG = True if os.getenv('ASSETS_DEBUG') == '1' else False

    AD_CLIENT_ID = os.environ['AD_CLIENT_ID']
    AD_CLIENT_SECRET = os.environ['AD_CLIENT_SECRET']


class Development(Config):
    DEBUG = True


class Production(Config):
    pass

flask_config = os.environ['FLASK_CONFIG']
app.config.from_object('pigeonpie.config.{}'.format(flask_config))
