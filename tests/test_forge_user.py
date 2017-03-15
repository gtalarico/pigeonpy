import json
import pytest
import pigeonpie



@pytest.fixture(scope="module")
def client():
    pigeonpie.app.config['TESTING'] = True
    return pigeonpie.app.test_client()


@pytest.fixture(scope="module")
def ForgeUser():
    from pigeonpie.forge import ForgeUser as ForgeUser_
    return ForgeUser_


@pytest.fixture(scope="module")
def token():
    import os
    return os.enviro['TEST_TOKEN']
    # return os.getenv('TEST_TOKEN', None)


@pytest.fixture(scope="module")
def request_context():
    return pigeonpie.app.test_request_context('')


# def test_hubs(ForgeUser, request_context, token, client):
#     if token:
#         with client as c:
#             with c.session_transaction() as session:
#                 session['access_token'] = token
