import graphene

from app.graph.resolvers.me_resolver import MeResolver
from app.graph.mutations.create_agency import CreateAgency


class Mutation(graphene.ObjectType):
    create_agency = CreateAgency.Field()


class Query(
    MeResolver,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
