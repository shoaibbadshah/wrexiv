from sqlalchemy_utils import UUIDType
from sqlalchemy import Column
from app import db
from sqlalchemy.sql import func
from sqlalchemy import ForeignKey

class DocumentProcessingTask(db.Model):
    __tablename__ = "document_processing_tasks"
    id = Column(UUIDType(binary=False), primary_key=True)
    current_task_id = Column(UUIDType(binary=False), nullable=False)
    document_name = Column(db.String(255), nullable=False)
    document_url = Column(db.String(255), nullable=False)

    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    agency_id = Column(UUIDType(binary=False), ForeignKey("agencies.id"), nullable=False)

    def __repr__(self):
        return f"<DocumentProcessingTask {self.id}>"