import graphene
from flask import g
from graphql import GraphQLError
from app.models.agency_user import Language


class LanguagesResolver:
    languages = graphene.List(graphene.String, required=True)

    def resolve_languages(self, info):
        return list(Language.__members__.keys())
