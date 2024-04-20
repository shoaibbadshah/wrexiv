from app.models.country_enum import CountryEnum
import graphene

CountryType = graphene.Enum.from_enum(CountryEnum)
