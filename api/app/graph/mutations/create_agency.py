from app.models.agency import Agency
from app.models.agency_user import AgencyUser
from app.graph.types.agency_user_type import AgencyUserType
import graphene
from app import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from graphql import GraphQLError

class CreateAgencyUserInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class CreateAgencyInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    agencyUser = CreateAgencyUserInput(required=True)


class CreateAgency(graphene.Mutation):
    class Arguments:
        input = CreateAgencyInput(required=True)

    agencyUser = graphene.Field(AgencyUserType)

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to update an agency")
        
        if g.get("current_agency") is not None:
            return GraphQLError("User is already associated with an agency")

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

        return CreateAgency(agencyUser=new_agency_user)
