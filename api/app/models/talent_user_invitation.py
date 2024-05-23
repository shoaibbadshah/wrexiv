from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, ForeignKey
from sqlalchemy.sql import func
from app import db

class TalentUserInvitation(db.Model):
    __tablename__ = "talent_user_invitations"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    email = Column(db.String(100), nullable=False)
    agency_id = Column(UUIDType(binary=False), ForeignKey("agencies.id"), nullable=False)
    accepted_at = Column(db.DateTime(timezone=True), nullable=True)

    invited_at = Column(db.DateTime(timezone=True), default=None, nullable=True)
    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    talent_profile_id = Column(UUIDType(binary=False), ForeignKey("talent_profiles.id"), nullable=True)

    def __repr__(self):
        return f"<TalentUserInvitation {self.name}>"