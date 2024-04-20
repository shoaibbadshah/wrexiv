"""Change type of published date on articles table

Revision ID: 59510bb4309d
Revises: c9bf524fc100
Create Date: 2024-02-16 20:45:32.238476

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '59510bb4309d'
down_revision = 'c9bf524fc100'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column('published_date',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column('published_date',
               existing_type=postgresql.TIMESTAMP(timezone=True),
               nullable=False)

    # ### end Alembic commands ###
