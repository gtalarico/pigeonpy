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


def test_bucketlist_get_unauthorized(client):
    pigeonpy.app.testing = False
    response = client.get('/api/buckets')
    assert response.status_code == 401
    data = response.get_data(as_text=True)
    assert 'could not verify' in data
    pigeonpy.app.testing = True


def test_bucketlist_get_raw(ForgeApp):
    url = pigeonpy.forge_routing.BucketList.url
    data, response = ForgeApp.request('get', url)
    assert response.status_code == 200
    assert 'items' in data


def test_bucketlist_names_raw(client, request_context, ForgeApp):
    assert ForgeApp.is_authenticated is True
    with request_context:
        response = client.get('/api/buckets')
        data = json.loads(response.get_data(as_text=True))
        assert 'items' in data
        assert 'pigeonpy-tests' in [b["bucketKey"] for b in data['items']]
