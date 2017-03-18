import os
from flask_assets import Environment, Bundle
from pigeonpie import app

scss = Bundle('css/main.scss',
              filters='libsass', output='packed/sass.css', depends='**/*.scss')

css_assets = Bundle(scss,
                    filters='cssmin', output='packed/packed.css'
                    )

comp_dir = '/'.join([app.config['STATICDIR'], 'js', 'components'])
components = ['/'.join([comp_dir, f]) for f in os.listdir(comp_dir)]

js_assets = Bundle('components/jquery/dist/jquery.js',
                   'components/angular/angular.js',
                   'components/angular-ui-router/release/angular-ui-router.js',
                   'components/materialize/dist/js/materialize.js',
                #    'js/forge.services.js',
                   'js/main.js',
                   *components,
                   filters='rjsmin', output='packed/packed.js')

assets = Environment(app)
assets.register('css_assets', css_assets)
assets.register('js_assets', js_assets)
