from app.models.language_enum import LanguageEnum
import graphene

LanguageType = graphene.Enum.from_enum(LanguageEnum)
