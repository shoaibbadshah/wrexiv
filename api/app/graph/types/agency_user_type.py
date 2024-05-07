from app.graph.types.language_type import LanguageType
import graphene


class AgencyUserType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    language = graphene.Field(LanguageType, required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    agency_id = graphene.UUID(required=True)
    user_id = graphene.UUID(required=True)
    agency = graphene.Field("app.graph.types.agency_type.AgencyType")
