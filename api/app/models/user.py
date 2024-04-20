from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column, ForeignKey
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func


class User(db.Model):
    __tablename__ = "users"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    auth_id = Column(String(100), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    tenant_users = relationship("TenantUser", back_populates="user", lazy="dynamic")
    admin_user = relationship("AdminUser", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User {self.email}>"
