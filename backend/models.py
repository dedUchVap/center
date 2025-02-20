import datetime
import enum
from typing import Annotated, get_type_hints
from dateutil.parser import parse
from sqlalchemy import String, ForeignKey, Table, Column, Integer, DATETIME, Text, CheckConstraint
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped, mapped_column, validates

from utils import get_password_hash


class Base(DeclarativeBase):
    pass


class BaseMeta(Base):
    __abstract__ = True

    @classmethod
    def get_metadata(cls):
        metadata = []
        for column in cls.__table__.columns:
            column_name = column.name

            column_info = cls.column_metadata.get(column_name, {})
            metadata.append({column_name: column_info})
        return metadata


class Role(enum.Enum):
    admin = 'admin'
    user = 'user'
    guest = 'user'
    ban = 'ban'


user_event_association = Table(
    'user_event', Base.metadata,
    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
    Column('event_id', Integer, ForeignKey('events.id'), primary_key=True)
)


class User(BaseMeta):
    __tablename__ = 'user'

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    disable: Mapped[bool]
    auth: Mapped[bool]
    roly = Column(String, nullable=False, default='user')
    refresh_token: Mapped[str] = mapped_column(nullable=True)
    date_bird_token = mapped_column(DATETIME)
    data_end_token = mapped_column(DATETIME)
    __table_args__ = (
        CheckConstraint('roly in ("admin", "user", "guest", "ban" )', name='check_roly'),
    )

    column_metadata = {'id': {'access': 'protect'}, 'username': {'access': 'read', 'types': 'text'},
                       'roly': {'access': 'write', 'types': 'select',
                                'select_option': ['admin', 'user', 'guest', 'ban']}, 'password': {'access': 'read'},
                       'auth': {'access': 'write'},
                       'disable': {'access': 'write', 'types': 'select', 'select_option': [True, False]},
                       'refresh_token': {'access': 'protect'}, 'date_bird_token': {'access': 'protect'},
                       'data_end_token': {'access': 'protect'}}

    @validates('auth', 'disable')
    def validate_boolean(self, key, value):
        if value == 'true':
            value = True
        else:
            value = False

        return value

    @validates('password')
    def password_validate(self, key, value):
        value = get_password_hash(value)
        return value


class Events(BaseMeta):
    __tablename__ = 'events'

    id: Mapped[int] = mapped_column(primary_key=True)
    data = mapped_column(DATETIME)
    title: Mapped[str] = mapped_column(String(30))
    describe: Mapped[str] = mapped_column(Text)
    iconname: Mapped[str]

    column_metadata = {'id': {'access': 'protect'},
                       'data': {'access': 'write', 'types': 'datetime-local'},
                       'title': {'access': 'write', 'types': 'text'},
                       'describe': {'access': 'write', 'types': 'text'},
                       'iconname': {'access': 'write', "types": 'icon'}}

    @validates('data')
    def data_validator(self, key, value):
        if isinstance(value, datetime.datetime):
            return value
        return parse(value)


class TestTable(Base):
    __tablename__ = 'test'
    __allow_unmapped__ = True

    id: Mapped[int] = mapped_column(primary_key=True)
    color: Annotated[Mapped[str], {'types': ['select']}] = mapped_column(String(32))


print(get_type_hints(TestTable, include_extras=True).get('color'))
