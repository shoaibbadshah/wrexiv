import graphene
from app.models.agency_user import Language
from graphql import GraphQLError
from flask import g
from app.models.agency import Agency
from app.models.agency_user import AgencyUser
from app import db
from sqlalchemy.exc import SQLAlchemyError
from app.graph.types.language_type import LanguageType

class UpdateMyAgencyUserInput(graphene.InputObjectType):
    name = graphene.String()
    language = graphene.Field(LanguageType)

class UpdateMyAgencyInput(graphene.InputObjectType):
    name = graphene.String()
    agencyUser = UpdateMyAgencyUserInput()

class UpdateMyAgency(graphene.Mutation):
    class Arguments:
        input = UpdateMyAgencyInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to update an agency")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        if input.get("name") == "":
            return GraphQLError("Agency name cannot be empty")
        
        if input.get("agencyUser"):
            if input.agencyUser.get("name") == "":
                return GraphQLError("Agency user name cannot be empty")
            if input.agencyUser.get("language") == "":
                return GraphQLError("Agency user language cannot be empty")
        
        try:
            # Update the agency
            Agency.query.filter_by(id=g.current_agency.id).update({"name": input.get("name", g.current_agency.name)})

            # Update the agency user
            if input.get("agencyUser"):
                AgencyUser.query.filter_by(id=g.current_agency_user.id,)\
                    .update({
                        "name": input.agencyUser.get("name", g.current_agency_user.name),
                        "language": input.agencyUser.get("language", g.current_agency_user.language)
                    })
            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return UpdateMyAgency(success=True)

