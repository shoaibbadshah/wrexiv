from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, Integer
from sqlalchemy.sql import func
from app import db


class TenantCredit(db.Model):
    __tablename__ = "tenant_credits"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    total_credits = Column(Integer, nullable=False)

    tenant_id = db.Column(
        UUIDType(binary=False), db.ForeignKey("tenants.id"), nullable=False
    )
    tenant = db.relationship("Tenant")

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<TenantCredit {self.id}>"
