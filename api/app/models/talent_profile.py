from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column, ForeignKey
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func


class TalentProfile(db.Model):
    __tablename__ = "talent_profiles"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    avatar = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=False)
    email = Column(String(100), nullable=True)
    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    agency_id = Column(
        UUIDType(binary=False), ForeignKey("agencies.id"), nullable=False
    )
    agency = relationship("Agency", back_populates="talent_profiles")

    talent_user_id = Column(
        UUIDType(binary=False), ForeignKey("talent_users.id"), nullable=True
    )

    talent_user = relationship("TalentUser", back_populates="talent_profile")

    def __repr__(self):
        return f"<TalentProfile {self.name}>"
