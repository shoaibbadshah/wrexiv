from app.graph.mutations.create_talent_profile import CreateTalentProfile
import graphene

from app.graph.resolvers.me_resolver import MeResolver
from app.graph.resolvers.talent_profiles_resolver import TalentProfilesResolver

from app.graph.mutations.create_agency import CreateAgency


class Mutation(graphene.ObjectType):
    create_agency = CreateAgency.Field()
    create_talent_profile = CreateTalentProfile.Field()


class Query(
    MeResolver,
    TalentProfilesResolver,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
