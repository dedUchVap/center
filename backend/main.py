import argparse
import time

from datetime import timedelta

from typing import Annotated, List

from crud import get_token
from config import outh2_scheme

import colorama
import uvicorn
from fastapi import FastAPI, Request, Depends, Form, Response, Cookie, Path, Query, Body, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from auth import authenticate_user, create_token, get_active_user, create_refresh_token, verify_token, \
    get_username_from_jwt
from crud import get_user as get_user_bd, add_user, insert_refresh_token, get_table_name, get_records, get_orm_table, \
    add_object_in_table
from schemas import UserInDB, User, Token, Table, UserPrivateInfo
from fastapi.responses import HTMLResponse
colorama.init()

parser = argparse.ArgumentParser()
parser.add_argument('--port', default=8005, type=int)
args = parser.parse_args()

app = FastAPI(debug=True)

# @app.middleware('http')
# async def time_request(requst: Request, call_next):
#     start_time = time.perf_counter()
#     response = await call_next(requst)
#     end_time = time.perf_counter() - start_time
#     print(end_time)
#     return response
#

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost', 'http://localhost/login',
                   'http://localhost:3000/manifest', 'http://192.168.1.235:3000', 'http://192.168.1.235',
                   'http://192.168.1.235/login'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],

)


@app.post('/token')
async def login_for_access_token(response: Response,
                                 form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(detail='Invalid username or password', status_code=404,
                            headers={"WWW-Authenticate": 'Bearer'})
    access_token_life_time = timedelta(minutes=30)
    access_token = create_token(data={'sub': user.username, 'roly': 'admin'}, time_life=access_token_life_time)
    refresh_token = create_refresh_token()
    insert_refresh_token(refresh_token, user)
    print(refresh_token.data_end_token)
    response.set_cookie(key='refresh_token', value=refresh_token.token_refresh, httponly=True,
                        expires=refresh_token.data_end_token_str, samesite='none', secure=True)

    return Token(access_token=access_token, token_type='bearer')


@app.get('/user/me')
async def read_user_me(user: Annotated[User, Depends(get_active_user)]):
    return user


@app.get('/test')
async def test():
    return 'String'


@app.post('/register')
async def register(user: Annotated[UserInDB, Form()]):
    user = UserInDB(**jsonable_encoder(user))
    if get_user_bd(username=user.username):
        raise HTTPException(detail='User already exists', status_code=401)
    add_user(user)


@app.get('/verifytoken', dependencies=[Depends(verify_token)])
async def get_refresh():
    return True


@app.get('/updatetoken')
async def update_token(token: Annotated[str, Depends(outh2_scheme)], refresh_token: Annotated[str, Cookie()]):
    username = get_username_from_jwt(token)
    if get_token(refresh_token):
        new_token = create_token({'sub': username})
        return Token(access_token=new_token, token_type='bearer')


@app.get('/tables', dependencies=[Depends(outh2_scheme)])
async def get_tables():
    return get_table_name()


@app.get('/tables/{table_name}', dependencies=[Depends(outh2_scheme)])
async def get_table_records(table_name: Annotated[str, Path()], limit: Annotated[int, Query()] = 20,
                            page: Annotated[int, Query()] = 0):
    result = get_records(table_name, limit, page)
    return result


@app.get('/add_record/{table_name}')
async def get_column(table_name: Annotated[str, Path()]):
    model = get_orm_table(table_name)
    if model:
        if hasattr(model, 'column_metadata'):
            column = model.get_metadata()
            return column


@app.post('/add_object/{table_name}')
async def add_object(table_name: Annotated[str, Path()], data: dict = Body()):
    orm_model = get_orm_table(table_name)
    add_object_in_table(orm_model, data)
    return HTMLResponse(content='<div>Контент добавлен</div>', status_code=status.HTTP_201_CREATED)


if __name__ == '__main__':
    uvicorn.run('main:app', port=args.port, reload=True, reload_includes=['*.py'], host='0.0.0.0')
