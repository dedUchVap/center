import jwt
from passlib.context import CryptContext
from schemas import UserInDB
from datetime import timedelta, datetime, timezone
from config import *
from typing import Annotated
from fastapi import Depends, HTTPException
from schemas import Token, TokenData, User, UserInDB, TokenRefresh
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError
from crud import get_user
import secrets
import colorama
import pytz


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    print(password)
    if not verify_password(password, user.password):
        return False
    return user


def create_token(data: dict, time_life: timedelta | None = None):
    to_encode = data.copy()
    if time_life:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(outh2_scheme)]):
    error_validate_token = HTTPException(detail='Server Error', status_code=404, headers={'WWW-Authenticate': 'Bearer'})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        if not username:
            raise error_validate_token
        token_data = TokenData(username=username)
    except (InvalidTokenError, ExpiredSignatureError) as error:
        if isinstance(error, ExpiredSignatureError):
            raise HTTPException(status_code=401, detail='Expired Token')
        raise error_validate_token
    user = get_user(username)
    if user is None:
        raise error_validate_token
    return user


def get_active_user(user: Annotated[User, Depends(get_current_user)]):
    if not user.disabled:
        return user
    else:
        raise HTTPException(detail='Inactive User', status_code=400)


def create_refresh_token():
    date_bird_token = datetime.utcnow()
    data_end_token = datetime.utcnow() + timedelta(days=6)
    data_end_token_str = data_end_token.strftime('%Y-%m-%d')
    print(colorama.Back.BLUE + f'{data_end_token}')
    token_refresh = secrets.token_hex(64)
    data = {'date_bird_token': date_bird_token, 'data_end_token': data_end_token, 'token_refresh': token_refresh,
            'data_end_token_str': data_end_token_str}
    data_shemes = TokenRefresh(**data)
    return data_shemes


def verify_token(token: Annotated[Token, Depends(outh2_scheme)]):
    try:
        print(colorama.Back.RED + f'{token}')
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except (InvalidTokenError, ExpiredSignatureError) as error:
        if isinstance(error, ExpiredSignatureError):
            raise HTTPException(status_code=401, detail='Invalid Token')


def get_username_from_jwt(access_token):
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
        username = payload.get('sub')
        return username
    except (ExpiredSignatureError, InvalidTokenError) as error:
        if not isinstance(error, ExpiredSignatureError):
            raise HTTPException(detail=f'{error}', status_code=404)
