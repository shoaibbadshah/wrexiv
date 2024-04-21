import factory
from datetime import datetime
from models.agency import Agency
from app import db
import uuid


class AgencyFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = Agency
        sqlalchemy_session = db.session
        sqlalchemy_session_persistence = "commit"

    id = factory.LazyFunction(lambda: str(uuid.uuid4()))
    name = factory.Faker("company")
    created_at = factory.LazyFunction(lambda: datetime.now().replace(microsecond=0))
    updated_at = factory.LazyFunction(lambda: datetime.now().replace(microsecond=0))
