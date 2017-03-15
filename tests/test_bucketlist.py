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


def test_bucketlist_get_unauthorized(client):
    pigeonpie.app.testing = False
    response = client.get('/api/buckets')
    assert response.status_code == 401
    data = response.get_data(as_text=True)
    assert 'could not verify' in data
    pigeonpie.app.testing = True


def test_bucketlist_get_raw(ForgeApp):
    url = pigeonpie.forge_routing.BucketList.url
    data, response = ForgeApp.request('get', url)
    assert response.status_code == 200
    assert 'items' in data


def test_bucketlist_names_raw(client, request_context, ForgeApp):
    assert ForgeApp.is_authenticated is True
    with request_context:
        response = client.get('/api/buckets')
        data = json.loads(response.get_data(as_text=True))
        assert 'items' in data
        assert 'pigeonpie-tests' in [b["bucketKey"] for b in data['items']]
