from sqlalchemy_utils import UUIDType
import uuid
import enum
from sqlalchemy import Column, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func

class TalentDocumentKind(enum.Enum):
    cover_letter = "cover_letter"

class TalentDocument(db.Model):
    __tablename__ = "talent_documents"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(db.String(100), nullable=False)
    kind = Column(Enum(TalentDocumentKind), nullable=False)
    json = Column(db.Text, nullable=False)
    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    talent_profile_id = Column(UUIDType(binary=False), ForeignKey("talent_profiles.id"), nullable=False)
    talent_profile = relationship("TalentProfile", backref="talent_document")

    agency_id = Column(UUIDType(binary=False), ForeignKey("agencies.id"), nullable=False)
    agency = relationship("Agency", backref="talent_document")

    def __repr__(self):
        return f"<TalentDocument {self.name}>"