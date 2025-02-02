"""rename invited_at to send_at

Revision ID: e28d99d4c2b8
Revises: 17e6470a1ea1
Create Date: 2024-05-27 11:32:41.928236

"""
from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'e28d99d4c2b8'
down_revision = '17e6470a1ea1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('talent_user_invitations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sent_at', sa.DateTime(timezone=True), nullable=True))
        batch_op.drop_column('invited_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('talent_user_invitations', schema=None) as batch_op:
        batch_op.add_column(sa.Column('invited_at', postgresql.TIMESTAMP(timezone=True), autoincrement=False, nullable=True))
        batch_op.drop_column('sent_at')

    # ### end Alembic commands ###
