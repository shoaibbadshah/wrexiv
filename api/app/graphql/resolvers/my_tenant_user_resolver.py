from app.graphql.types.tenant_user_type import TenantUserType
import graphene
from flask import g
from graphql import GraphQLError


class MyTenantUserResolver(graphene.ObjectType):
    tenant_user = graphene.Field(TenantUserType)

    def resolve_tenant_user(self, info):
        if g.get("current_tenant_user") is None:
            return GraphQLError("Tenant user not found")

        return g.current_tenant_user
