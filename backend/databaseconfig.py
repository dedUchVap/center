import sqlalchemy
from sqlalchemy.orm import sessionmaker
from sqlalchemy import inspect, MetaData

engine = sqlalchemy.engine.create_engine('sqlite:///database.db', echo=True)
Session = sessionmaker(bind=engine)


def get_session():
    session = Session()
    return session

def get_inspector():
    inspector = inspect(engine)
    return inspector

def get_meta():
    metadata = MetaData()
    metadata.reflect(bind=engine)
    return metadata