from app.graphql.types.lead_type import LeadType
from app.models.lead import Lead
import graphene
from flask import g


class LeadResolver:
    lead = graphene.Field(graphene.NonNull(LeadType), id=graphene.UUID(required=True))

    def resolve_lead(self, info, id):
        return Lead.query.filter_by(id=id, tenant_id=g.current_tenant.id).first()
