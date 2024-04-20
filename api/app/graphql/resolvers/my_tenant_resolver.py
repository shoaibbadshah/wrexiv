from app.graphql.types.tenant_type import TenantType
from app.models.tenant import Tenant
import graphene
from flask import g
from graphql import GraphQLError


class MyTenantResolver:
    tenant = graphene.Field(TenantType)

    def resolve_my_tenant(self, info):
        if g.get("current_tenant") is None:
            return GraphQLError("Tenant not found")

        return g.current_tenant
