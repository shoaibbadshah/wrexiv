from app.graph.types.talent_profile_type import TalentProfileType
import graphene
from flask import g
from graphql import GraphQLError


class TalentProfilesResolver:
    talent_profiles = graphene.List(TalentProfileType)

    def resolve_talent_profiles(self, info):
        if g.get("current_agency") is None:
            return GraphQLError("Agency not found")

        return g.current_agency.talent_profiles
