errors = {
    'UserAlreadyExistsError': {
        'message': "A user with that username already exists.",
        'status': 409,
    },
    'ResourceDoesNotExist': {
        'message': "A resource with that ID no longer exists.",
        'status': 410,
        'extra': "Any extra information you want.",
    },
    'Unauthorized': {
        'message': "User is not authorized.",
        'status': 401,
        'extra': "Clear browser cache",
    },
}
