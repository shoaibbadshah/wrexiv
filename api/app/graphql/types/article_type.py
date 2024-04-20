from app.graphql.types.country_type import CountryType
from app.graphql.types.language_type import LanguageType
import graphene


class ArticleType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    title = graphene.String(required=True)
    snippet = graphene.String(required=True)
    summary = graphene.String(required=False)
    body_original = graphene.String(required=False)
    body_translated = graphene.String(required=False)
    source_url = graphene.String()
    published_date = graphene.DateTime(required=False)
    cover_image = graphene.String()
    countries = graphene.List(graphene.NonNull(CountryType), required=True)
    language = graphene.Field(LanguageType, required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
