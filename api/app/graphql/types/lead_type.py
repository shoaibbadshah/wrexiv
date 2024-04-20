from app.graphql.types.organization_type import OrganizationType
import graphene


class LeadType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    email = graphene.String(required=False)
    channel = graphene.String(required=False)
    avatar = graphene.String(required=False)
    country = graphene.String(required=False)
    region = graphene.String(required=False)
    title = graphene.String(required=False)
    description = graphene.String(required=False)
    linkedin_url = graphene.String(required=False)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)

    organization = graphene.Field(OrganizationType, required=False)
