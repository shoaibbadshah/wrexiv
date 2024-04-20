from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app import db


class ArticleSearchKeyword(db.Model):
    __tablename__ = "article_search_keywords"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    keyword = Column(String(50), nullable=False)
    language = Column(String(50), nullable=False)
    country = Column(String(50), nullable=False)

    article_search_condition_id = Column(
        UUIDType(binary=False),
        ForeignKey("article_search_conditions.id"),
        nullable=False,
    )
    article_search_condition = relationship(
        "ArticleSearchCondition", backref="article_search_keywords"
    )

    created_at = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self):
        return f"<ArticleSearchKeyword {self.id}>"
