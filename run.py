import os
from pigeonpie import app

files = []
for filename in os.listdir('pigeonpie/templates'):
    files.append('pigeonpie/templates/' + filename)

app.run(extra_files=files)
