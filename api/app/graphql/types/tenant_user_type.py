import graphene


class TenantUserType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
