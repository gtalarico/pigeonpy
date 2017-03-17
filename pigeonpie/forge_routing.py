import json
import requests

from flask import request, jsonify, redirect, session
from flask_restful import Resource, abort

from pigeonpie import app, app_api
from pigeonpie.forge import ForgeUser, ForgeApp
from pigeonpie.security import UserResouce, AdminResource


class User(Resource):
    def get(self):
        user = session.get('user')
        if user:
            return jsonify(user)
        abort(401)


class ItemsList(UserResouce):
    url = 'https://developer.api.autodesk.com/project/v1/hubs/{hub_id}/projects/{project_id}'

    def get(self, hub_id, project_id):
        url = ItemsList.url.format(hub_id=hub_id, project_id=project_id)
        json_data, response = ForgeUser.request('get', url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)


class ProjectList(UserResouce):
    url = 'https://developer.api.autodesk.com/project/v1/hubs/{hub_id}/projects'

    def get(self, hub_id):
        url = ProjectList.url.format(hub_id=hub_id)
        json_data, response = ForgeUser.request('get', url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)


class HubList(UserResouce):
    url = 'https://developer.api.autodesk.com/project/v1/hubs'

    def get(self):
        # http://stackoverflow.com/questions/37204077/415-unsupported-media-type-error
        json_data, response = ForgeUser.request('get', HubList.url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)


class BucketList(AdminResource):
    url = 'https://developer.api.autodesk.com/oss/v2/buckets'

    def get(self):
        json_data, response = ForgeApp.request('get', BucketList.url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)


class Bucket(AdminResource):
    url = 'https://developer.api.autodesk.com/oss/v2/buckets'

    def get(self, bucket_key):
        url = Bucket.url + '/{bucket}/details'.format(bucket=bucket_key)
        json_data, response = ForgeApp.request('get', url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)

    def post(self, bucket_key):
        data = {"bucketKey": bucket_key, "policyKey": "transient"}
        json_data, response = ForgeApp.request('post', Bucket.url, data=json.dumps(data))
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)

    def delete(self, bucket_key):
        # BUG: A successfull delete returns 200 but no body,
        url = Bucket.url + '/{bucket}'.format(bucket=bucket_key)
        json_data, response = ForgeApp.request('delete', url)
        code = response.status_code
        return jsonify(json_data) if code == 200 else abort(code)



app_api.add_resource(User, '/api/user')
app_api.add_resource(HubList, '/api/hubs')
app_api.add_resource(BucketList, '/api/buckets')
app_api.add_resource(Bucket, '/api/buckets/<string:bucket_key>')
app_api.add_resource(ProjectList, '/api/hubs/<string:hub_id>/projects')
app_api.add_resource(ItemsList, '/api/hubs/<string:hub_id>/projects/<string:project_id>')
