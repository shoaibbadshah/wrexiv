from app.graph.types.talent_profile_type import TalentProfileType
from graphene import List, NonNull
from flask import g
from graphql import GraphQLError


class TalentProfilesResolver:
    talent_profiles = List(NonNull(TalentProfileType))

    def resolve_talent_profiles(self, info):
        if g.get("current_agency") is None:
            raise GraphQLError("Agency not found")

        return g.current_agency.talent_profiles
