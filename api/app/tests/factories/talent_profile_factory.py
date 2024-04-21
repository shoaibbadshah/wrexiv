import factory
from datetime import datetime
from app.models.talent_profile import TalentProfile
from app import db
import uuid
from .agency_factory import AgencyFactory


class TalentProfileFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = TalentProfile
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    id = factory.LazyFunction(lambda: str(uuid.uuid4()))
    name = factory.Faker("name")
    avatar = factory.Faker("image_url")
    bio = factory.Faker("paragraph")
    created_at = factory.LazyFunction(datetime.now)
    updated_at = factory.LazyFunction(datetime.now)
    agency_id = factory.LazyAttribute(lambda _: AgencyFactory().id)
