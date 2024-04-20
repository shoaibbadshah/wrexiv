from app.graphql.types.lead_type import LeadType
from app.models.lead import Lead
import graphene
from flask import g


class LeadsResolver:
    leads = graphene.List(graphene.NonNull(LeadType))

    def resolve_leads(self, info):
        return (
            Lead.query.filter_by(tenant_id=g.current_tenant.id)
            .order_by(Lead.created_at.desc())
            .all()
        )
