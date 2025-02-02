from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column, ForeignKey
from app import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class TalentUser(db.Model):
    __tablename__ = "talent_users"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    user_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="talent_user", uselist=False)

    talent_profile = relationship("TalentProfile", back_populates="talent_user", uselist=False)

    __mapper_args__ = {"polymorphic_identity": "talent_user"}

    def __repr__(self):
        return f"<TalentUser {self.name}>"
