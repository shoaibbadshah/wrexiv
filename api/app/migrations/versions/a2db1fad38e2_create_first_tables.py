"""Create first tables

Revision ID: a2db1fad38e2
Revises:
Create Date: 2024-04-20 01:48:32.076942

"""

from alembic import op
import sqlalchemy as sa
import sqlalchemy_utils

# revision identifiers, used by Alembic.
revision = "a2db1fad38e2"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "agencies",
        sa.Column(
            "id", sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False
        ),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "users",
        sa.Column(
            "id", sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False
        ),
        sa.Column("auth_id", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column(
            "role_id", sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=True
        ),
        sa.Column(
            "role_type",
            sqlalchemy_utils.types.choice.ChoiceType(
                choices=[("AGENCY_USER", "Agency User")]
            ),
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("auth_id"),
        sa.UniqueConstraint("email"),
    )
    op.create_table(
        "agency_users",
        sa.Column(
            "id", sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False
        ),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column(
            "agency_id",
            sqlalchemy_utils.types.uuid.UUIDType(binary=False),
            nullable=False,
        ),
        sa.Column(
            "user_id",
            sqlalchemy_utils.types.uuid.UUIDType(binary=False),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["agency_id"],
            ["agencies.id"],
        ),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "talent_profiles",
        sa.Column(
            "id", sqlalchemy_utils.types.uuid.UUIDType(binary=False), nullable=False
        ),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column(
            "agency_id",
            sqlalchemy_utils.types.uuid.UUIDType(binary=False),
            nullable=False,
        ),
        sa.ForeignKeyConstraint(
            ["agency_id"],
            ["agencies.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("talent_profiles")
    op.drop_table("agency_users")
    op.drop_table("users")
    op.drop_table("agencies")
    # ### end Alembic commands ###
