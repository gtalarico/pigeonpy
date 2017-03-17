import os
from flask_assets import Environment, Bundle
from pigeonpie import app

join = os.path.join
COMPONENTS = 'components'

scss = Bundle('css/main.scss',
              filters='libsass', output='packed/sass.css', depends='**/*.scss')

css_assets = Bundle(scss,
                    filters='cssmin', output='packed/packed.css'
                    )

js_assets = Bundle('components/jquery/dist/jquery.js',
                   'components/angular/angular.js',
                   'components/angular-route/angular-route.js',
                   'components/materialize/dist/js/materialize.js',
                   'js/main.js',
                   'js/buckets-controller.js',
                   'js/hubs-controller.js',
                   'js/hub-controller.js',
                   'js/home-controller.js',
                #    'js/routing.js',
                   filters='rjsmin', output='packed/packed.js')

assets = Environment(app)
assets.register('css_assets', css_assets)
assets.register('js_assets', js_assets)
