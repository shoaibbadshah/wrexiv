import graphene


class UserType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    email = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
