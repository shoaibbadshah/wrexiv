from app.models.agency import Agency
from app.models.agency_user import AgencyUser, Language
from app.graph.types.agency_type import AgencyType
import graphene
from app import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from graphql import GraphQLError
from app.graph.types.language_type import LanguageType

class CreateAgencyUserInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    language = graphene.Field(LanguageType, required=True)


class CreateAgencyInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    agencyUser = CreateAgencyUserInput(required=True)


class CreateAgency(graphene.Mutation):
    class Arguments:
        input = CreateAgencyInput(required=True)

    agency = graphene.Field(AgencyType)
    success = graphene.Boolean()

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to create an agency")
        
        if g.get("current_agency") is not None:
            return GraphQLError("User is already associated with an agency")
        
        if input.get("name") is None:
            return GraphQLError("Agency name is required")

        if input.get("agencyUser") is None or input.agencyUser.get("name") is None:
            return GraphQLError("Agency user data is required")

        try:
            language = Language.en
            if input.agencyUser.language in Language.__members__:
                language = Language[input.agencyUser.language]

            new_agency = Agency(name=input.name)
            db.session.add(new_agency)
            db.session.flush()

            new_agency_user = AgencyUser(
                name=input.agencyUser.name,
                agency_id=new_agency.id,
                user_id=g.current_user.id,
                language=language
            )
            db.session.add(new_agency_user)

            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return CreateAgency(agency=new_agency, success=True)
