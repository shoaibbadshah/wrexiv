"""add agency foreign key to document processing task

Revision ID: 6886706a2611
Revises: be0c9ac0c5a5
Create Date: 2024-05-10 11:30:37.767464

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = '6886706a2611'
down_revision = 'be0c9ac0c5a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('document_processing_tasks', schema=None) as batch_op:
        batch_op.create_foreign_key(None, 'agencies', ['agency_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('document_processing_tasks', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')

    # ### end Alembic commands ###
