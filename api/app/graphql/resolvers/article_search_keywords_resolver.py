from typing import List
from app.models.article_search_condition import ArticleSearchCondition
from graphene import ObjectType, List as GrapheneList, NonNull
from app.models.article_search_keyword import ArticleSearchKeyword
from app.graphql.types.article_search_keyword_type import ArticleSearchKeywordType
from flask import g


class ArticleSearchKeywordsResolver(ObjectType):
    article_search_keywords = GrapheneList(
        NonNull(ArticleSearchKeywordType),
    )

    def resolve_article_search_keywords(self, info) -> List[ArticleSearchKeywordType]:
        session = ArticleSearchKeyword.query.session

        keywords = (
            session.query(ArticleSearchKeyword)
            .join(
                ArticleSearchCondition,
                ArticleSearchKeyword.article_search_condition_id
                == ArticleSearchCondition.id,
            )
            .filter(ArticleSearchCondition.tenant_id == g.current_tenant.id)
            .all()
        )

        return keywords
