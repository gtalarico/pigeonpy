import os
from flask_assets import Environment, Bundle
from pigeonpie import app

join = os.path.join
COMPONENTS = 'components'

scss = Bundle('scss/main.scss',
              filters='libsass', output='packed/sass.css', depends='**/*.scss')

css_assets = Bundle('components/angular-loading-bar/build/loading-bar.css',
                    'css/forge-viewer.css',
                    scss,
                    filters='cssmin', output='packed/packed.css'
                    )

js_assets = Bundle(
                   'components/jquery/dist/jquery.js',
                   'components/angular/angular.js',
                   'components/angular-ui-router/release/angular-ui-router.js',
                   'components/angular-animate/angular-animate.js',
                   'components/angular-resource/angular-resource.js',
                   'components/angular-loading-bar/build/loading-bar.js',
                   'components/materialize/dist/js/materialize.js',
                #    'components/three.js/build/three.js',
                   'js/app.js',
                   'js/forge.services.js',
                   'js/user.services.js',
                   'js/main.controller.js',
                   'js/nav.controller.js',
                   'js/buckets.controller.js',
                   'js/viewer.controller.js',
                #    'js/project-controller.js',
                #    'js/routing.js',
                   filters='rjsmin', output='packed/packed.js')

assets = Environment(app)
assets.register('css_assets', css_assets)
assets.register('js_assets', js_assets)
