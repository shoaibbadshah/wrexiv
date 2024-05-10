"""add document_processing_tasks table

Revision ID: be0c9ac0c5a5
Revises: eb92f3b81892
Create Date: 2024-05-10 11:20:56.051712

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils


# revision identifiers, used by Alembic.
revision = 'be0c9ac0c5a5'
down_revision = 'eb92f3b81892'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('document_processing_tasks',
    sa.Column('id', sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False),
    sa.Column('document_name', sa.String(length=255), nullable=False),
    sa.Column('document_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    sa.Column('agency_id', sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('talent_document_imports', schema=None) as batch_op:
        batch_op.add_column(sa.Column('document_processing_task_id', sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False))
        batch_op.create_foreign_key(None, 'document_processing_tasks', ['document_processing_task_id'], ['id'])
        batch_op.drop_column('file_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('talent_document_imports', schema=None) as batch_op:
        batch_op.add_column(sa.Column('file_url', sa.VARCHAR(length=255), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('document_processing_task_id')

    op.drop_table('document_processing_tasks')
    # ### end Alembic commands ###
