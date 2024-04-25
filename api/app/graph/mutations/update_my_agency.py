import graphene
from app.graph.types.agency_user_type import AgencyUserType
from graphql import GraphQLError
from flask import g
from app.models.agency import Agency
from app.models.agency_user import AgencyUser
from app import db
from sqlalchemy.exc import SQLAlchemyError

class UpdateMyAgencyUserInput(graphene.InputObjectType):
    name = graphene.String()

class UpdateMyAgencyInput(graphene.InputObjectType):
    name = graphene.String()
    agencyUser = UpdateMyAgencyUserInput()

class UpdateMyAgency(graphene.Mutation):
    class Arguments:
        input = UpdateMyAgencyInput(required=True)

    success = graphene.Boolean()
    message = graphene.String()
    agencyUser = graphene.Field(AgencyUserType)

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to update an agency")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")

        try:
            if input.get("name"):
                Agency.query.filter_by(id=g.current_agency.id).update({"name": input.name})
                g.current_agency.name = input.name
            if input.get("agencyUser") and input.agencyUser.get("name"):
                AgencyUser.query.filter_by(id=g.current_agency_user.id).update({"name": input.agencyUser.name})
                g.current_agency_user.name = input.agencyUser.name
                
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return UpdateMyAgency(success=True, message="Agency updated successfully", agencyUser=g.current_agency_user)

