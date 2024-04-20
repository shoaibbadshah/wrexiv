from typing import List
from app.models.article_search_condition import ArticleSearchCondition
from graphene import ObjectType, List as GrapheneList, NonNull
from app.graphql.types.article_search_condition_type import ArticleSearchConditionType
from flask import g


class ArticleSearchConditionsResolver(ObjectType):
    article_search_conditions = GrapheneList(
        NonNull(ArticleSearchConditionType),
    )

    def resolve_article_search_conditions(
        self, info
    ) -> List[ArticleSearchConditionType]:
        session = ArticleSearchCondition.query.session

        conditions = (
            session.query(ArticleSearchCondition)
            .filter(ArticleSearchCondition.tenant_id == g.current_tenant.id)
            .all()
        )

        return conditions
