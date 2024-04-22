from app.graph.types.agency_type import AgencyType
from app.graph.types.agency_user_type import AgencyUserType
import graphene
from flask import g

class AgencyResolver:
    current_agency = graphene.Field(AgencyType)
    current_agency_user = graphene.Field(AgencyUserType)

    def resolve_current_agency(self, info):
        return g.current_agency
    
    def resolve_current_agency_user(self, info):
        return g.current_agency_user