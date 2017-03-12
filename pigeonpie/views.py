from flask import Flask, render_template, request
from pigeonpie import app

@app.route('/')
def index():
    return 'Hello World'
    # return render_template('')
