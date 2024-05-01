import graphene
from app.models.agency_user import Language


class LanguageType(graphene.ObjectType):
    id = graphene.String(required=True)
    name = graphene.String(required=True)

class LanguagesResolver:
    languages = graphene.List(LanguageType)

    def resolve_languages(self, info):
        return [{"id": id, "name": name.value} for id, name in Language.__members__.items()]
