from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app import db


class IndividualSource(db.Model):
    __tablename__ = "individual_sources"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    individual_id = db.Column(
        UUIDType(binary=False), ForeignKey("individuals.id"), nullable=False
    )
    info_source_id = db.Column(
        UUIDType(binary=False), ForeignKey("info_sources.id"), nullable=False
    )

    individual = relationship("Individual", backref="individual_sources")
    info_source = relationship("InfoSource", backref="individual_sources")

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
        return f"<IndividualSource {self.id}>"
