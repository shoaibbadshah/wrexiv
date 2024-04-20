from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from app import db


class OrganizationMember(db.Model):
    __tablename__ = "organization_members"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    organization_id = db.Column(
        UUIDType(binary=False), ForeignKey("organizations.id"), nullable=False
    )
    individual_id = db.Column(
        UUIDType(binary=False), ForeignKey("individuals.id"), nullable=False
    )

    organization = db.relationship("Organization", backref="members")
    individual = db.relationship("Individual", backref="organizations")

    created_at = db.Column(
        db.DateTime(timezone=True), default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<OrganizationMember {self.id}>"
