from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint


class TenantUser(db.Model):
    __tablename__ = "tenant_users"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = db.Column(db.String(100), nullable=False)

    tenant_id = db.Column(
        UUIDType(binary=False), db.ForeignKey("tenants.id"), nullable=False
    )
    user_id = db.Column(
        UUIDType(binary=False), db.ForeignKey("users.id"), nullable=False
    )

    tenant = relationship("Tenant")
    user = db.relationship("User", back_populates="tenant_users")

    created_at = db.Column(
        db.DateTime(timezone=True), default=func.now(), nullable=False
    )
    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    __table_args__ = (UniqueConstraint("tenant_id", "user_id", name="_tenant_user_uc"),)

    def __repr__(self):
        return f"<TenantUser {self.name}>"
