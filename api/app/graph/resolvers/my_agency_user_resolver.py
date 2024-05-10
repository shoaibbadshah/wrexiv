from app.graph.types.agency_user_type import AgencyUserType
import graphene
from flask import g

class MyAgencyUserResolver:
    my_agency_user = graphene.Field(AgencyUserType)

    def resolve_my_agency_user(self, info):
        return g.get("current_agency_user")