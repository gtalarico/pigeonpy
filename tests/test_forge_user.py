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


def test_oauth_redirect(client, ForgeUser):
    import re
    import webbrowser
    url = 'https://developer.api.autodesk.com/authentication/v1/authorize'
    response = client.get('/login')
    match = re.search(r'(?:href=")(.+)(?:")', response.get_data(as_text=True))
    assert bool(match.group()) is True
    assert 'https://developer.api.autodesk.com/authentication/v1/authorize' in str(match.group())
