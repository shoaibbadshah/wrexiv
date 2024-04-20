from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app import db
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList


class Article(db.Model):
    __tablename__ = "articles"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    snippet = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    # body = Column(Text, nullable=True)
    body_original = Column(Text, nullable=True)
    body_translated = Column(Text, nullable=True)
    source_url = Column(Text, nullable=True)
    published_date = Column(DateTime(timezone=True), nullable=True)
    cover_image = Column(Text, nullable=True)

    countries = Column(MutableList.as_mutable(ARRAY(String)), nullable=False)
    language = Column(String(255), nullable=False)

    tenant_id = Column(UUIDType(binary=False), ForeignKey("tenants.id"), nullable=False)
    tenant = relationship("Tenant", backref="articles")

    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<Article {self.title}>"
