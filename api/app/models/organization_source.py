from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app import db


class OrganizationSource(db.Model):
    __tablename__ = "organization_sources"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    organization_id = db.Column(
        UUIDType(binary=False), ForeignKey("organizations.id"), nullable=False
    )
    info_source_id = db.Column(
        UUIDType(binary=False), ForeignKey("info_sources.id"), nullable=False
    )

    organization = relationship("Organization", backref="organization_sources")
    info_source = relationship("InfoSource", backref="organization_sources")

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
        return f"<OrganizationSource {self.id}>"
