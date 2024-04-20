from app.graphql.types.language_type import LanguageType
import graphene


class DirectMessageType(graphene.ObjectType):
    language = LanguageType(required=True)
    subject = graphene.String(required=True)
    body = graphene.String(required=True)
