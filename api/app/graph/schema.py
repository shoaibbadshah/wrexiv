import graphene

from app.graph.mutations.create_agency import CreateAgency
from app.graph.mutations.create_talent_profile import CreateTalentProfile

from app.graph.resolvers.me_resolver import MeResolver
from app.graph.resolvers.talent_profiles_resolver import TalentProfilesResolver
from app.graph.resolvers.current_agency_resolver import AgencyResolver



class Mutation(graphene.ObjectType):
    create_agency = CreateAgency.Field()
    create_talent_profile = CreateTalentProfile.Field()


class Query(
    MeResolver,
    TalentProfilesResolver,
    AgencyResolver,

    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
