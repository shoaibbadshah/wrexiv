from app.models.talent_user_invitation import TalentUserInvitation
from app.models.talent_profile import TalentProfile
from app.lib.mailer import Mailer
from app import db

from sqlalchemy.exc import SQLAlchemyError
from graphql import GraphQLError
from sqlalchemy import func
from flask import g, abort
import graphene

import logging


class CreateTalentUserInvitationInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    talent_profile_id = graphene.UUID(required=True)

class CreateTalentUserInvitation(graphene.Mutation):
    class Arguments:
        input = CreateTalentUserInvitationInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to create talent user invitations")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        # Check if talent_profile_id is valid
        talent_profile = TalentProfile.query.get(input.talent_profile_id)
        if talent_profile is None:
            return GraphQLError("Talent profile not found")
        
        # Send email to talent
        mailer = Mailer()
        email_success = mailer.send_talent_invitation(to=input.email, talent_name=talent_profile.name, agency_name=g.current_agency.name)

        if not email_success:
            abort(500, f"Failed to send email to {input.email}")
        
        try:
            # Check if the user is already invited
            existing_talent_user_invitation = TalentUserInvitation.query.filter_by(talent_profile_id=input.talent_profile_id).first()

            if existing_talent_user_invitation is not None:
                # Update the email and invited_at fields
                existing_talent_user_invitation.email = input.email
                existing_talent_user_invitation.sent_at = func.now()
            else:
                # Create a new talent user invitation
                new_talent_user_invitation = TalentUserInvitation(
                    email=input.email,
                    agency_id=g.current_agency.id,
                    talent_profile_id=input.talent_profile_id,
                    sent_at=func.now(),
                )
                db.session.add(new_talent_user_invitation)

            db.session.commit()

        except SQLAlchemyError as e:
            db.session.rollback()
            logging.error(e)
            abort(500, "Failed to create talent user invitation")

        return CreateTalentUserInvitation(success=True)
