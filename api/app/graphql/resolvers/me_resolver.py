from app.graphql.types.user_type import UserType
import graphene
from flask import g
from graphene import ResolveInfo
from graphql import GraphQLError


class MeResolver:
    user = graphene.Field(UserType)

    def resolve_user(self, info: ResolveInfo):
        if g.get("current_user") is None:
            return GraphQLError("User not found")

        return g.current_user
