from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func


class Agency(db.Model):
    __tablename__ = "agencies"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    agency_users = relationship("AgencyUser", back_populates="agency")

    def __repr__(self):
        return f"<Agency {self.name}>"
