from http import HTTPStatus


def test_read_root_deve_retornar_ok_e_ola_mundo(client):
    response = client.get('/')  # Act (ação)

    assert response.status_code == HTTPStatus.OK  # Assert
    assert response.json() == {'message': 'Olá mundo'}


def test_create_users(client):
    response = client.post(
        '/users',
        json={
            'username': 'Alice',
            'email': 'alice@example.com',
            'password': '1234',
        },
    )

    assert response.status_code == HTTPStatus.CREATED
    assert response.json() == {
        'id': 1,
        'username': 'Alice',
        'email': 'alice@example.com',
    }


def test_read_users(client):
    response = client.get('/users')

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'users': [{'id': 1, 'username': 'Alice', 'email': 'alice@example.com'}]
    }


def test_update_users(client):
    response = client.put(
        '/users/1',
        json={
            'id': 1,
            'username': 'Alice',
            'email': 'alice@example.com',
            'password': '1234',
        },
    )

    assert response.status_code == HTTPStatus.OK
    assert response.json() == {
        'id': 1,
        'username': 'Alice',
        'email': 'alice@example.com',
    }
