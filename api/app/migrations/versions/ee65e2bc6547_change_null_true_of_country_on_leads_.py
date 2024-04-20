"""Change null true of country on leads table

Revision ID: ee65e2bc6547
Revises: 445267cc185d
Create Date: 2024-02-21 04:23:49.402447

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee65e2bc6547'
down_revision = '445267cc185d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(length=50),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('leads', schema=None) as batch_op:
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(length=50),
               nullable=False)

    # ### end Alembic commands ###
