from http import HTTPStatus

from fastapi import APIRouter

router_users_v1 = APIRouter(prefix='/api/v1/', tags='User')


@router_users_v1.get('/users', status_code=HTTPStatus.OK)
async def read_users():
    return


@router_users_v1.get('/users/{user_id}', status_code=HTTPStatus.OK)
async def read_user(user_id: int):
    return


@router_users_v1.post('/users', status_code=HTTPStatus.CREATED)
async def create_user(user_id: int):
    return


@router_users_v1.put('/users/{user_id}', status_code=HTTPStatus.OK)
async def update_user(user_id: int):
    return


@router_users_v1.delete('/users/{user_id}', status_code=HTTPStatus.OK)
async def delete_user(user_id: int):
    return
