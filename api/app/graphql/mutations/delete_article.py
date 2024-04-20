import graphene
from flask import g
from graphql import GraphQLError
from app.infra.database import db
from app.models.article import Article


class DeleteArticle(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()

    def mutate(root, info, id):
        try:
            article = Article.query.filter_by(
                id=id, tenant_id=g.current_tenant.id
            ).first()

            if not article:
                raise GraphQLError("Article not found or access denied")

            db.session.delete(article)
            db.session.commit()

            return DeleteArticle(success=True)

        except Exception as e:
            db.session.rollback()
            raise GraphQLError(f"Failed to delete article: {str(e)}")
