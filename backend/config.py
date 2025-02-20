from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

SECRET_KEY = '7ef6e9f8997eed82a58a8de8c8d6c64a677c64c09cdf2656b619686ff284c836'
ALGORITHM = 'HS256'

outh2_scheme = OAuth2PasswordBearer(tokenUrl='/token')

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$YejX3tUEmKU8wvStLulSnuPwynBhRnOkWRR8nelT0yC3/oyziTuZy",
        "disabled": False,
    },
    "Nick":
        {
            "username": "Nick",
            "full_name": "John Doe",
            "email": "johndoe@example.com",
            "hashed_password": "$2b$12$H0HHgV9T6XeKvRGt7okNu.kVW0jfgDqMe9cD/y8smGG6.FnJyQ7LS",
            "disabled": False,
        }
}

allowed_hosts = [
    'http://localhost:3000',
    'http://localhost',
    'http://192.168.1.235:3000'
]
