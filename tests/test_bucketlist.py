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


def test_bucketlist_get_raw(forge):
    url = pigeonpie.api.BucketList.url
    res = forge.session.get(url)
    assert res.status_code == 200


def test_bucketlist_names_raw(forge):
    url = pigeonpie.api.BucketList.url
    res = forge.session.get(url)
    data = res.json()
    assert 'items' in data


def test_bucketlist_get(client):
    response = client.get('/api/buckets')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))


def test_bucketlist_names_raw(client):
    response = client.get('/api/buckets')
    data = json.loads(response.get_data(as_text=True))
    assert 'items' in data
    assert 'pigeonpie-tests' in [b["bucketKey"] for b in data['items']]
