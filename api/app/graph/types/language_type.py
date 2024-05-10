from app.models.agency_user import Language
import graphene

LanguageType = graphene.Enum.from_enum(Language)