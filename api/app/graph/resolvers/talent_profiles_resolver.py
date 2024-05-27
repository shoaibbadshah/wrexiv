from app.graph.types.talent_profile_type import TalentProfileType
from graphene import List, NonNull
from flask import g
from graphql import GraphQLError
import logging


class TalentProfilesResolver:
    talent_profiles = List(NonNull(TalentProfileType))

    def resolve_talent_profiles(self, info):
        if g.get("current_agency") is None:
            raise GraphQLError("Agency not found")

        try:
            talent_profiles = g.current_agency.talent_profiles
        except Exception as e:
            logging.error(f"Failed to fetch talent profiles for agency {g.current_agency.id}: {e}")
            raise GraphQLError(f"Falied to fetch talent profiles")
        return talent_profiles
