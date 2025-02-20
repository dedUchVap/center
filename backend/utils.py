from config import pwd_context


def get_password_hash(password):
    password_hashed = pwd_context.hash(password)
    print(password_hashed)
    return password_hashed


