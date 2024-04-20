import graphene

from app.graphql.resolvers.me_resolver import MeResolver

from app.graphql.mutations.create_agency import CreateAgency


class Mutation(graphene.ObjectType):
    create_agency = CreateAgency.Field()


class Query(
    MeResolver,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
