import json
import pytest
import pigeonpie
from pigeonpie.forge import Forge



@pytest.fixture(scope="module")
def client():
    pigeonpie.app.config['TESTING'] = True
    return pigeonpie.app.test_client()


@pytest.fixture(scope="module")
def forge():
    return Forge()


def test_bucket_access(client):
    response = client.get('/api/buckets/pigeonpie-tests')
    assert response.status_code == 200


def test_bucket_get(client):
    """'createdDate': 1489311808559,
    'bucketKey': 'pigeonpie-tests',
    'bucketOwner': 'XXX',
    'policyKey': 'transient',
    'permissions': [
        {'authId': 'Z350QXyqRAguS5A3EXqAlIpoNSqSHMYi', 'access': 'full'}]}
    """
    response = client.get('/api/buckets/pigeonpie-tests')
    data = json.loads(response.get_data(as_text=True))
    assert data['bucketKey'] == 'pigeonpie-tests'
    assert 'createdDate' in data
    assert 'permissions' in data


def test_bucket_post_exists(client):
    """ {'reason': 'Bucket already exists'} """
    response = client.post('/api/buckets/pigeonpie-tests')
    data = json.loads(response.get_data(as_text=True))
    assert data['reason'] == 'Bucket already exists'


def test_bucket_delete_non_existent(client):
    response = client.delete('/api/buckets/asljdasdlkasdjasdasdasdasjdojasd')
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data['reason'] == 'Bucket not found'


def test_bucket_create_delete(client):
    TEMP_BUCKET = '/api/buckets/pigeonpie-tests-temp'
    # Create
    response = client.post(TEMP_BUCKET)
    assert response.status_code == 200
    # Get
    response = client.get(TEMP_BUCKET)
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data.get('bucketKey') == 'pigeonpie-tests-temp'
    # Delet
    response = client.delete(TEMP_BUCKET)
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert data['deleted'] == 'pigeonpie-tests-temp'
    # Verify Deleted
    response = client.get(TEMP_BUCKET)
    assert response.status_code == 404 or b'marked for deletion' in response.data
