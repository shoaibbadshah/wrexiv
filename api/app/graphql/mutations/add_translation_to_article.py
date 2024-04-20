from app.graphql.types.article_type import ArticleType
from app.lib.google_translater_api import GoogleTranslateAPI
import graphene
from flask import g
from graphql import GraphQLError
from app.infra.database import db
from app.models.article import Article

google_translate_api = GoogleTranslateAPI()


class AddTranslationToArticleInput(graphene.InputObjectType):
    article_id = graphene.ID(required=True)


class AddTranslationToArticle(graphene.Mutation):
    class Arguments:
        input = AddTranslationToArticleInput(required=True)

    article = graphene.Field(ArticleType)

    def mutate(root, info, input):
        try:
            article = Article.query.filter_by(
                id=input.article_id, tenant_id=g.current_tenant.id
            ).first()

            if not article:
                raise GraphQLError("Article not found or access denied")

            target_language = "en"
            article.body_translated = google_translate_api.translate_text(
                target_language, article.body_original
            )
            db.session.add(article)
            db.session.commit()

            return AddTranslationToArticle(article=article)

        except Exception as e:
            db.session.rollback()  # Rollback in case of any error
            raise GraphQLError(f"Failed to add translation to summary: {str(e)}")
