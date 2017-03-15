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
    assert 'permissions' in data


def test_bucket_post_exists(client):
    """ {'reason': 'Bucket already exists'} """
    response = client.post('/api/buckets/pigeonpie-tests')
    assert response.status_code == 409

    data = json.loads(response.get_data(as_text=True))
    assert 'conflict happened while processing the request' in data['message']


def test_bucket_delete_non_existent(client):
    response = client.delete('/api/buckets/asljdasdlkasdjasdasdasdasjdojasd')
    assert response.status_code == 404

    data = json.loads(response.get_data(as_text=True))
    assert 'The requested URL was not found on the server.' in data['message']


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
    # Delete
    response = client.delete(TEMP_BUCKET)
    assert response.status_code == 200

    # Verify Deleted
    response = client.get(TEMP_BUCKET)
    assert response.status_code == 409
    data = json.loads(response.get_data(as_text=True))
    assert 'The resource might have been modified' in data['message']
