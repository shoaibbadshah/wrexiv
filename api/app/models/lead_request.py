from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db
from sqlalchemy.orm import relationship


class LeadRequest(db.Model):
    __tablename__ = "lead_requests"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    description = db.Column(db.Text, nullable=False)
    target_country = db.Column(db.String(100), nullable=False)
    target_region = db.Column(db.String(100), nullable=True)
    budget = db.Column(db.Float, nullable=False)

    tenant_id = db.Column(UUIDType(binary=False), db.ForeignKey("tenants.id"))
    tenant = relationship("Tenant")

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
        return f"<LeadRequest {self.id}>"
