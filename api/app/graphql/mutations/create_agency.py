from app.graphql.types.agency_type import AgencyType
from app.models.agency import Agency
from app.models.agency_user import AgencyUser
import graphene
from app.infra.database import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g


class CreateAgencyUserInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class CreateAgencyInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    website = graphene.String()
    agencyUser = CreateAgencyUserInput(required=True)


class CreateAgency(graphene.Mutation):
    class Arguments:
        input = CreateAgencyInput(required=True)

    agency = graphene.Field(AgencyType)

    def mutate(self, info, input):
        # g.current_agency で例外を吐いてしまう
        # if g.current_agency:
        #     return g.current_agency

        try:
            new_agency = Agency(name=input.name)
            db.session.add(new_agency)
            db.session.flush()

            new_agency_user = AgencyUser(
                name=input.agencyUser.name,
                agency_id=new_agency.id,
                user_id=g.current_user.id,
            )
            db.session.add(new_agency_user)

            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return CreateAgency(agency=new_agency)
