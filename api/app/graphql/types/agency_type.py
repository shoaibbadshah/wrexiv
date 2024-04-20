import graphene


class AgencyType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
