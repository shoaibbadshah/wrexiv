from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column, ForeignKey
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func


class AdminUser(db.Model):
    __tablename__ = "admin_users"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)

    user_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    user = relationship("User")

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
        return f"<AdminUser {self.name}>"
