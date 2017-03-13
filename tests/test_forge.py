import json
import pytest
import pigeonpie
from pigeonpie.forge import Forge


@pytest.fixture(scope="module")
def client():
    return pigeonpie.app.test_client()

@pytest.fixture(scope="module")
def forge():
    return Forge()


def test_get_token_api(forge):
    assert 'access_token' in forge.token
    assert 'access_token' in forge.get_new_token()


def test_singleton(client, forge):
    assert pigeonpie.api.forge.token == forge.token


def test_get_token_api(client):
    response = client.get('/api/token')
    data = json.loads(response.get_data(as_text=True))
    assert isinstance(data, dict)
    assert 'access_token' in data


def test_forge_session(forge):
    req = forge.session.get('http://www.google.com')
    assert req.status_code == 200
