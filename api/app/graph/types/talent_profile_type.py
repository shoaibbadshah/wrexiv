import graphene


class TalentProfileType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    avatar = graphene.String()
    bio = graphene.String()
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
