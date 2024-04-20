from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy.sql import func
from app import db


class Tenant(db.Model):
    __tablename__ = "tenants"

    id = db.Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)

    name = db.Column(db.String(100), nullable=False)
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
        return f"<Tenant {self.name}>"
