from app.graphql.types.article_search_condition_type import ArticleSearchConditionType
from app.graphql.types.country_type import CountryType
from app.graphql.types.language_type import LanguageType
import graphene


class ArticleSearchKeywordType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    keyword = graphene.String(required=True)
    language = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    search_condition = graphene.Field(ArticleSearchConditionType, required=True)

    def resolve_search_condition(self, info):
        return self.article_search_condition
