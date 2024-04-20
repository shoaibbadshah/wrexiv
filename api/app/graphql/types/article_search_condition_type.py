from app.graphql.types.country_type import CountryType
import graphene


class ArticleSearchConditionType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    description = graphene.String(required=True)
    countries = graphene.List(graphene.NonNull(CountryType), required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
