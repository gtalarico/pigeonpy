import json
import pytest
import pigeonpie


@pytest.fixture(scope="module")
def client():
    pigeonpie.app.config['TESTING'] = True
    return pigeonpie.app.test_client()


@pytest.fixture(scope="module")
def ForgeApp():
    from pigeonpie.forge import ForgeApp as ForgeApp_
    return ForgeApp_


@pytest.fixture(scope="module")
def request_context():
    return pigeonpie.app.test_request_context('')


def test_authentication_init(ForgeApp):
    assert ForgeApp.access_token is not None
    assert ForgeApp.is_authenticated is True
    ForgeApp.deauthorize()
    assert ForgeApp.access_token is None
    assert ForgeApp.is_authenticated is False


def test_singleton(ForgeApp):
    assert ForgeApp.access_token == pigeonpie.forge._ForgeApp().access_token


def test_forge_session(ForgeApp, request_context):
    with request_context:
        response = ForgeApp.request('get', 'http://www.google.com')
        assert response.response.status_code == 200

def test_forge_session_headers(ForgeApp, request_context):
    response = ForgeApp.request('get', 'http://www.google.com', headers={'x':'z'})
    assert response.response.request.headers['x'] == 'z'
