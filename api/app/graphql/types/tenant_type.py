import graphene


class TenantType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    website = graphene.String(required=False)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)

    @staticmethod
    def resolve_name(tenant, info):
        return tenant.name
