"""Add organization columns to leads table

Revision ID: 454662c3971e
Revises: 2c67120fc32f
Create Date: 2024-02-22 20:25:51.974640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '454662c3971e'
down_revision = '2c67120fc32f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.add_column(sa.Column('organization_url', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('organization_name', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('organization_logo', sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column('organization_description', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('organization_phone', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('organization_industry', sa.String(length=100), nullable=True))
        batch_op.add_column(sa.Column('organization_country', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('organization_region', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('organization_linkedin_url', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.drop_column('organization_linkedin_url')
        batch_op.drop_column('organization_region')
        batch_op.drop_column('organization_country')
        batch_op.drop_column('organization_industry')
        batch_op.drop_column('organization_phone')
        batch_op.drop_column('organization_description')
        batch_op.drop_column('organization_logo')
        batch_op.drop_column('organization_name')
        batch_op.drop_column('organization_url')

    # ### end Alembic commands ###
