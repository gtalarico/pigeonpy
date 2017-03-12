import json
import requests

from flask import request, jsonify
from flask_restful import Resource

from pigeonpie.forge import token
from pigeonpie import app, app_api

todos = {}

# curl http://localhost:5000/todo1 -d "data=Remember the milk" -X PUT
# class Auth(Resource):
#     def get(self):
#         r = requests.post(URL, headers=headers, data=payload)
#         return r.json()

class BucketList(Resource):
    url = 'https://developer.api.autodesk.com/oss/v2/buckets'
    headers = {
               'Content-Type': 'application/json',
               'User-Agent': 'curl/7.51.0',
               'Accept': '*/*',
               'Authorization': 'Bearer {}'.format(token)}

    def get(self):
        headers = BucketList.headers
        req = requests.get(BucketList.url, headers=headers)
        if req.status_code != 200:
            return jsonify({'error': req.reasone})
        return jsonify(req.json())


class Bucket(BucketList):
    def get(self, bucket_key):
        url = Bucket.url + '/{bucket}/details'.format(bucket=bucket_key)
        req = requests.get(url, headers=Bucket.headers)
        return jsonify(req.json())

    def post(self, bucket_key):
        data = {"bucketKey": bucket_key, "policyKey": "transient"}
        req = requests.post(Bucket.url, headers=Bucket.headers, data=json.dumps(data))
        return jsonify(req.json())

    def delete(self, bucket_key):
        data = {"bucketKey": bucket_key, "policyKey": "transient"}
        req = requests.delete(Bucket.url, headers=Bucket.headers, data=json.dumps(data))
        return jsonify(req.json())


app_api.add_resource(BucketList, '/api/buckets')
app_api.add_resource(Bucket, '/api/buckets/<string:bucket_key>')
# http://flask.pocoo.org/snippets/129/
