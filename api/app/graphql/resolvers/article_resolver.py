from graphene import ObjectType, Field, ID, String
from app.graphql.types.article_type import ArticleType
from app.models.article import Article
from flask import g
from graphql import GraphQLError


class ArticleResolver(ObjectType):
    article = Field(
        ArticleType,
        id=ID(required=True),
        description="Fetch a single article by its ID",
    )

    def resolve_article(self, info, id) -> ArticleType:
        try:
            article = Article.query.filter_by(
                id=id, tenant_id=g.current_tenant.id
            ).first()

            if not article:
                raise GraphQLError("Article not found or access denied")

            return article
        except Exception as e:
            raise GraphQLError(f"Failed to fetch article: {str(e)}")
