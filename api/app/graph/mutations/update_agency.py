import graphene
from app.graph.types.agency_type import AgencyType
from graphql import GraphQLError
from flask import g
from app.models.agency import Agency
from app.models.agency_user import AgencyUser
from app import db
from sqlalchemy.exc import SQLAlchemyError

class UpdateAgencyInput(graphene.InputObjectType):
    id = graphene.UUID(required=True)
    name = graphene.String()

class UpdateAgency(graphene.Mutation):
    class Arguments:
        input = UpdateAgencyInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        try:
            # Create a new dictionary to store the new data
            new_data = {}
            if input.get("name"):
                new_data["name"] = input["name"]

            # Update the agency
            Agency.query.filter_by(id=input["id"]).update(new_data)

            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return UpdateAgency(success=True)

