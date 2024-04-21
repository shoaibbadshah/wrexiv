import pytest
from app.tests.factories.agency_factory import AgencyFactory
from app.tests.factories.talent_profile_factory import TalentProfileFactory
from app.graph.resolvers.talent_profiles_resolver import TalentProfilesResolver
from graphql import GraphQLError
from flask import g


def test_resolve_talent_profiles_success(database, client):
    agency = AgencyFactory()
    talent_profiles = TalentProfileFactory.create_batch(3, agency=agency)
    with client.application.test_request_context("/graphql"):
        g.current_agency = agency
        resolver = TalentProfilesResolver()
        result = resolver.resolve_talent_profiles(None)
        assert len(result) == len(talent_profiles)
        for r, t in zip(result, talent_profiles):
            assert r.id == t.id
            assert r.name == t.name


def test_resolve_talent_profiles_error(database, client):
    resolver = TalentProfilesResolver()
    with client.application.test_request_context("/graphql"):
        g.current_agency = None
        with pytest.raises(GraphQLError) as exc_info:
            resolver.resolve_talent_profiles(None)
        assert str(exc_info.value) == "Agency not found"
