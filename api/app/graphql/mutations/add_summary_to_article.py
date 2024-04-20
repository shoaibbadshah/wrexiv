from app.lib.gpts.summarize_gpt import SummarizeGPT
import graphene
from graphql import GraphQLError
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from app.models.article import Article
from app.infra.database import db
from app.graphql.types.article_type import ArticleType

summarize_gpt = SummarizeGPT()


class AddSummaryToArticleInput(graphene.InputObjectType):
    article_id = graphene.ID(required=True)


class AddSummaryToArticle(graphene.Mutation):
    class Arguments:
        input = AddSummaryToArticleInput(required=True)

    article = graphene.Field(ArticleType)

    def mutate(root, info, input):
        try:
            article = db.session.query(Article).filter_by(id=input.article_id).first()
            if not article:
                raise GraphQLError("Article not found")

            if article.tenant_id != g.current_tenant_user.tenant_id:
                raise GraphQLError("Unauthorized to update this article")

            target_language = "en"
            article.summary = summarize_gpt.summarize(
                article.body_original, target_language
            )

            db.session.add(article)
            db.session.commit()

            return AddSummaryToArticle(article=article)

        except SQLAlchemyError as e:
            db.session.rollback()
            raise GraphQLError("Failed to add summary to article: " + str(e))
