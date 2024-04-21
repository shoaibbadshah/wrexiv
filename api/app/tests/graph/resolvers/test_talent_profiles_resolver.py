import pytest
from unittest.mock import MagicMock
from tests.factories.agency_factory import AgencyFactory
from tests.factories.talent_profile_factory import TalentProfileFactory
from app.graph.resolvers.talent_profiles_resolver import TalentProfilesResolver
from graphql import GraphQLError


def test_resolve_talent_profiles_success(db):
    agency = AgencyFactory()
    talent_profiles = TalentProfileFactory.create_batch(3, agency=agency)

    resolver = TalentProfilesResolver()
    info = MagicMock()
    info.context = {"g": {"current_agency": agency}}

    result = resolver.resolve_talent_profiles(info)

    assert result == talent_profiles


def test_resolve_talent_profiles_error(db):
    resolver = TalentProfilesResolver()
    info = MagicMock()
    info.context = {"g": {}}

    with pytest.raises(GraphQLError) as exc_info:
        resolver.resolve_talent_profiles(info)

    assert str(exc_info.value) == "Agency not found"
