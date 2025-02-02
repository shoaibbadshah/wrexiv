from app.graph.types.document_status_type import DocumentStatusType
from app.models.document_processing_task import DocumentProcessingTask
from graphene import List, NonNull, Field, Int
from flask import g
from graphql import GraphQLError
from celery.result import AsyncResult

class DocumentStatusesResolver:
    document_statuses = Field(List(NonNull(DocumentStatusType)), limit=Int(default_value=100), offset=Int(default_value=0))

    def resolve_document_statuses(self, info, limit, offset):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to create documents")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        document_processing_tasks = DocumentProcessingTask.query.filter_by(agency_id=g.current_agency.id).order_by(DocumentProcessingTask.created_at.desc()).limit(limit).offset(offset).all()
        document_statuses = []
        for task in document_processing_tasks:
            result = AsyncResult(str(task.celery_task_id))
            document_statuses.append({
                "id": task.id,
                "document_name": task.document_name,
                "status": result.state,
                "created_at": task.created_at,
                "updated_at": task.updated_at,
            })

        return document_statuses
