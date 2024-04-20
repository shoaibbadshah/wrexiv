from typing import List
from app.graphql.types.article_type import ArticleType
from app.models.article import Article
from graphene import ObjectType, List as GrapheneList, NonNull
from flask import g
from sqlalchemy import desc


class ArticlesResolver(ObjectType):
    articles = GrapheneList(NonNull(ArticleType))

    def resolve_articles(self, info) -> List[ArticleType]:
        session = Article.query.session

        articles = (
            session.query(Article)
            .filter(Article.tenant_id == g.current_tenant.id)
            .order_by(desc(Article.created_at))
            .all()
        )

        return articles
