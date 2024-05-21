import graphene
from app.graph.types.task_status_type import TaskStatusType

class DocumentStatusType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    document_name = graphene.String(required=True)
    status = graphene.Field(TaskStatusType, required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)