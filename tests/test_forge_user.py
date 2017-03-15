import json
import pytest
import pigeonpie



@pytest.fixture(scope="module")
def client():
    pigeonpie.app.config['TESTING'] = True
    return pigeonpie.app.test_client()


@pytest.fixture(scope="module")
def ForgeUser():
    from pigeonpie.forge import ForgeUSer as ForgeUSer_
    return ForgeUser_


# def test_authentication_init(ForgeApp):
#     assert ForgeApp.access_token is not None
#     assert ForgeApp.is_authenticated is True
#     ForgeApp.deauthorize()
#     assert ForgeApp.access_token is None
#     assert ForgeApp.is_authenticated is False
