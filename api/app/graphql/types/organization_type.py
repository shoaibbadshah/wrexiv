import graphene


class OrganizationType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=False)
    logo = graphene.String(required=False)
    description = graphene.String(required=False)
    phone = graphene.String(required=False)
    industry = graphene.String(required=False)
    country = graphene.String(required=False)
    region = graphene.String(required=False)
    linkedin_url = graphene.String(required=False)
    website = graphene.String(required=False)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
