import json
import requests

from flask import request, jsonify, redirect
from flask_restful import Resource

from pigeonpie import app, app_api
from pigeonpie.forge import Forge

forge = Forge()


class Token(Resource):
    """ Token """
    def get(self):
        token = forge.token
        if token:
            return jsonify(token)
        else:
            return jsonify({'error': 'authentication failed'})


class BucketList(Resource):
    url = 'https://developer.api.autodesk.com/oss/v2/buckets'

    def get(self):
        response = forge.session.get(BucketList.url)
        if response.status_code != 200:
            return jsonify({'error': response.text})
        return jsonify(response.json())


class Bucket(BucketList):
    url = 'https://developer.api.autodesk.com/oss/v2/buckets'

    def get(self, bucket_key):
        url = BucketList.url + '/{bucket}/details'.format(bucket=bucket_key)
        response = forge.session.get(url)
        return jsonify(response.json())

    def post(self, bucket_key):
        data = {"bucketKey": bucket_key, "policyKey": "transient"}
        response = forge.session.post(Bucket.url, data=json.dumps(data))
        return jsonify(response.json())

    def delete(self, bucket_key):
        url = BucketList.url + '/{bucket}'.format(bucket=bucket_key)
        response = forge.session.delete(url)
        if response.status_code == 200:
            # FIX: A successfull delete returns 200 but no body,
            # this would cause jsonify to fail on response
            return jsonify({'deleted': bucket_key})
        return jsonify(response.json())



app_api.add_resource(BucketList, '/api/buckets')
app_api.add_resource(Bucket, '/api/buckets/<string:bucket_key>')
app_api.add_resource(Token, '/api/token')
# http://flask.pocoo.org/snippets/129/
