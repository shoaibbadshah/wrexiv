from sqlalchemy_utils import UUIDType, ChoiceType
import uuid
from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func


class User(db.Model):
    __tablename__ = "users"

    ROLE_TYPES = [("agency_user", "Agency User")]

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

    role_id = Column(UUIDType(binary=False), nullable=True)
    role_type = Column(ChoiceType(ROLE_TYPES), nullable=True)

    agency_user = relationship("AgencyUser", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User {self.email}>"
