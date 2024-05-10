import graphene

class DocumentStatusType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    document_name = graphene.String(required=True)
    status = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)