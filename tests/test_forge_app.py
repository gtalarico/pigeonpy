import json
import pytest
import pigeonpy


@pytest.fixture(scope="module")
def client():
    pigeonpy.app.config['TESTING'] = True
    return pigeonpy.app.test_client()


@pytest.fixture(scope="module")
def ForgeApp():
    from pigeonpy.forge import ForgeApp as ForgeApp_
    return ForgeApp_


@pytest.fixture(scope="module")
def request_context():
    return pigeonpy.app.test_request_context('')


def test_authentication_init(ForgeApp):
    assert ForgeApp.access_token is not None
    assert ForgeApp.is_authenticated is True
    ForgeApp.deauthorize()
    assert ForgeApp.access_token is None
    assert ForgeApp.is_authenticated is False


def test_singleton(ForgeApp):
    assert ForgeApp.access_token == pigeonpy.forge._ForgeApp().access_token


def test_forge_session(ForgeApp, request_context):
    with request_context:
        response = ForgeApp.request('get', 'http://www.google.com')
        assert response.response.status_code == 200

def test_forge_session_headers(ForgeApp, request_context):
    response = ForgeApp.request('get', 'http://www.google.com', headers={'x':'z'})
    assert response.response.request.headers['x'] == 'z'
