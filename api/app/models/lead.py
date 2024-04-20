from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db


class Lead(db.Model):
    __tablename__ = "leads"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=True)
    first_name = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    channel = db.Column(db.String(100), nullable=True)
    avatar = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(50), nullable=True)
    region = db.Column(db.String(50), nullable=True)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)

    organization_id = db.Column(
        UUIDType(binary=False),
        db.ForeignKey("organizations.id"),
        nullable=True,
    )
    organization = db.relationship("Organization", backref="leads")

    tenant_id = db.Column(
        UUIDType(binary=False),
        db.ForeignKey("tenants.id"),
        nullable=False,
    )
    tenant = db.relationship("Tenant", backref="leads")

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
        return f"<Lead {self.name}>"
