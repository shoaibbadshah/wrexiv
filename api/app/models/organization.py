from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db


class Organization(db.Model):
    __tablename__ = "organizations"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(100), nullable=True)
    logo = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    industry = db.Column(db.String(100), nullable=True)
    country = db.Column(db.String(50), nullable=True)
    region = db.Column(db.String(50), nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255), nullable=True)

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
        return f"<Organization {self.name}>"
