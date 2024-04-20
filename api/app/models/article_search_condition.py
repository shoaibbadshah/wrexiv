from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import String, Column, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app import db
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList


class ArticleSearchCondition(db.Model):
    __tablename__ = "article_search_conditions"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    description = Column(Text, nullable=False)
    countries = Column(MutableList.as_mutable(ARRAY(String(50))), nullable=False)

    tenant_id = Column(UUIDType(binary=False), ForeignKey("tenants.id"), nullable=False)
    tenant = relationship("Tenant", backref="article_search_conditions")

    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<ArticleSearchCondition {self.id}>"
