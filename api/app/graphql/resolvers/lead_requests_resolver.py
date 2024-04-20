from app.graphql.types.lead_type import LeadType
from app.models.lead import Lead
import graphene
from flask import g


class LeadRequestsResolver:
    leads = graphene.List(LeadType)

    def resolve_lead_requests(self, info):
        return []
