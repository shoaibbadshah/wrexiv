"""Change leads table

Revision ID: 2c67120fc32f
Revises: c6542a863439
Create Date: 2024-02-22 20:17:09.382172

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c67120fc32f'
down_revision = 'c6542a863439'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.add_column(sa.Column('linkedin_url', sa.String(length=255), nullable=True))
        batch_op.drop_column('organization')
        batch_op.drop_column('link')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.add_column(sa.Column('link', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('organization', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
        batch_op.drop_column('linkedin_url')

    # ### end Alembic commands ###
