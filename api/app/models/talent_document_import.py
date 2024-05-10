from sqlalchemy_utils import UUIDType
import uuid
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from app import db
from sqlalchemy.sql import func

class TalentDocumentImport(db.Model):
    __tablename__ = "talent_document_imports"
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    json = Column(db.Text, nullable=False)
    created_at = Column(db.DateTime(timezone=True), default=func.now(), nullable=False)
    updated_at = Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    talent_document_id = Column(UUIDType(binary=False), ForeignKey("talent_documents.id"), nullable=False)
    talent_document = relationship("TalentDocument", backref="talent_document_import")

    document_processing_task_id = Column(UUIDType(binary=False), ForeignKey("document_processing_tasks.id"), nullable=False)
    document_processing_task = relationship("DocumentProcessingTask", backref="talent_document_import")

    def __repr__(self):
        return f"<TalentDocumentImport {self.id}>"