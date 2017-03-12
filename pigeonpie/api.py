from flask import request
from flask_restful import Resource

from pigeonpie import app_api

todos = {}

# curl http://localhost:5000/todo1 -d "data=Remember the milk" -X PUT
class TodoSimple(Resource):
    def get(self, todo_id):
        return {todo_id: todos[todo_id]}

    def put(self, todo_id):
        todos[todo_id] = request.form['data']
        return {todo_id: todos[todo_id]}

    def delete(self, todo_id):
        todos.pop(todo_id)
        return {todo_id: 'deleted'}

app_api.add_resource(TodoSimple, '/<string:todo_id>')
