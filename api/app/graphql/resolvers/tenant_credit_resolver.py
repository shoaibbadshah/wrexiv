from app.graphql.types.tenant_credit_type import TenantCreditType
from app.models.tenant_credit import TenantCredit
import graphene
from flask import g


class TenantCreditResolver:
    tenant_credit = graphene.Field(graphene.NonNull(TenantCreditType))

    def resolve_tenant_credit(self, info):
        return TenantCredit.query.filter_by(tenant_id=g.current_tenant.id).first()
