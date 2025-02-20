from pydantic import BaseModel, Field, PastDatetime
from enum import Enum
from typing import Optional
from datetime import datetime


class Roly(Enum):
    admin = 'Admin'
    user = 'user'
    guest = 'guest'
    ban = 'ban'


class Token(BaseModel):
    access_token: str
    token_type: str


class User(BaseModel):
    username: str
    disable: bool | None = None
    auth: bool | None = None
    roly: Roly | None = None

    class Config:
        orm_mode = True


class UserInDB(User):
    password: str


class TokenData(BaseModel):
    username: str | None = None


class UserPrivateInfo(UserInDB):
    date_bird_token: Optional[datetime] = None
    data_end_token: Optional[datetime] = None
    refresh_token: Optional[str] = None


class TokenRefresh(BaseModel):
    date_bird_token: datetime
    data_end_token: datetime
    token_refresh: str
    data_end_token_str: str | None = None


class Table(BaseModel):
    name: str
    lenRecords: int


class EventsValidate:
    title: Field(min_length=15, max_length=50)
    describe: Field(max_length= 300, min_length=50)
    data: datetime