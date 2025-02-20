import colorama
from databaseconfig import get_session, get_inspector, get_meta
from models import User, Events
from schemas import UserInDB, TokenRefresh
from sqlalchemy import select, insert, MetaData
from utils import get_password_hash
from fastapi.exceptions import HTTPException
from fastapi import status

models_list = [User, Events]


def get_user(username):
    session = get_session()
    stmt = select(User).where(User.username == username)
    response = session.execute(stmt).scalars().first()
    if not response:
        return False
    user = UserInDB(username=response.username, disable=False, password=response.password, auth=response.auth)
    return user


def add_user(user):
    session = get_session()
    userdb = User(username=user.username, password=user.password, disable=False, auth=False, data_end_token=None,
                  date_bird_token=None, refresh_token=None, roly='Admin')
    session.add(userdb)
    session.commit()
    return True


def insert_refresh_token(data: TokenRefresh, user: User):
    try:
        session = get_session()
        stmt = select(User).filter_by(username=user.username)
        response = session.execute(stmt).scalars().first()
        response.refresh_token = data.token_refresh
        response.data_end_token = data.data_end_token
        response.date_bird_token = data.date_bird_token
        session.commit()
    except:
        raise HTTPException(detail='Ошибка при работе с токеном', status_code=404)


def get_token(token: str):
    session = get_session()
    stmt = select(User).filter_by(refresh_token=token)
    response = session.execute(stmt).scalars().first()
    if response:
        return True
    raise HTTPException(detail='Invalid Token', status_code=404)


def get_table_name():
    tables_array = []
    session = get_session()
    for table in models_list:
        len_record = session.query(table).count()
        tables_array.append({'nameTable': table.__tablename__, 'lenRecords': len_record})
    return tables_array


def get_records(table_name, limit, page):
    index = -1
    print(colorama.Fore.GREEN + f'f{page},   {limit}')
    session = get_session()
    table = None
    for table_current in models_list:
        index += 1
        if table_name == table_current.__tablename__:
            table = table_current
            stmt = select(table).limit(limit).offset(limit * page)
            result = session.execute(stmt).mappings().all()
            result = [i[table_current.__name__] for i in result]
            return result


def get_orm_table(table_name):
    for model in models_list:
        if model.__tablename__ == table_name:
            return model
        print(colorama.Fore.GREEN + f'{model}')
    return False


def add_object_in_table(orm_model, data):
    try:
        session = get_session()
        object_orm = orm_model(**data)
        session.add(object_orm)
        session.commit()
    except Exception as e:
        raise HTTPException(detail='Ошибка, проверьте поля', status_code=status.HTTP_204_NO_CONTENT)