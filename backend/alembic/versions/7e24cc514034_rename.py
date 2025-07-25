"""rename

Revision ID: 7e24cc514034
Revises: c1bec932b606
Create Date: 2025-02-14 20:16:41.434942

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7e24cc514034'
down_revision: Union[str, None] = 'c1bec932b606'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('refresh_token', sa.String(), nullable=True))
    op.drop_column('user', 'refresh_toke')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('refresh_toke', sa.VARCHAR(), nullable=True))
    op.drop_column('user', 'refresh_token')
    # ### end Alembic commands ###
