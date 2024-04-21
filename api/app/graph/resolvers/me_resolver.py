from app.graph.types.user_type import UserType
import graphene
from flask import g
from graphql import GraphQLError


class MeResolver:
    user = graphene.Field(UserType)

    def resolve_user(self, info):
        if g.get("current_user") is None:
            return GraphQLError("User not found")

        return g.current_user
