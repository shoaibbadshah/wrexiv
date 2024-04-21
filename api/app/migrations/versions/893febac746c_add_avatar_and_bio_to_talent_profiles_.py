"""Add avatar and bio to talent profiles table

Revision ID: 893febac746c
Revises: a2db1fad38e2
Create Date: 2024-04-20 23:05:50.932961

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "893febac746c"
down_revision = "a2db1fad38e2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("talent_profiles", schema=None) as batch_op:
        batch_op.add_column(sa.Column("avatar", sa.String(length=255), nullable=True))
        batch_op.add_column(sa.Column("bio", sa.Text(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("talent_profiles", schema=None) as batch_op:
        batch_op.drop_column("bio")
        batch_op.drop_column("avatar")

    # ### end Alembic commands ###
