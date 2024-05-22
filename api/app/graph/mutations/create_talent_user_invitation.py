from app.models.talent_user_invitation import TalentUserInvitation
import graphene
from app import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from graphql import GraphQLError


class CreateTalentUserInvitationInput(graphene.InputObjectType):
    email = graphene.String(required=True)

class CreateTalentUserInvitation(graphene.Mutation):
    class Arguments:
        input = CreateTalentUserInvitationInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to create talent user invitations")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        try:
            new_talent_user_invitation = TalentUserInvitation(
                email=input.email,
                agency_id=g.current_agency.id,
            )
            db.session.add(new_talent_user_invitation)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return CreateTalentUserInvitation(success=True)
