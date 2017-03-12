from flask import Flask, render_template, request
from pigeonpie import app

from pigeonpie.forge import token

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buckets')
def buckets():
    return render_template('buckets.html')
