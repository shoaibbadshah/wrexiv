from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db


class InfoSource(db.Model):
    __tablename__ = "info_sources"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = db.Column(db.String(100), nullable=True)
    url = db.Column(db.String(1024), nullable=True)
    description = db.Column(db.Text, nullable=True)

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
        return f"<InfoSource {self.name}>"
