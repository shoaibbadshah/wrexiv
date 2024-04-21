from app.graph.types.talent_profile_type import TalentProfileType
from app.models.talent_profile import TalentProfile
import graphene
from app import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g


class CreateTalentProfileInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    avatar = graphene.String()
    bio = graphene.String()


class CreateTalentProfile(graphene.Mutation):
    class Arguments:
        input = CreateTalentProfileInput(required=True)

    talent_profile = graphene.Field(TalentProfileType)

    def mutate(self, info, input):
        try:
            new_talent_profile = TalentProfile(
                name=input.name,
                avatar=input.avatar,
                bio=input.bio,
                agency_id=g.current_agency.id,
            )
            db.session.add(new_talent_profile)
            db.session.commit()
        except SQLAlchemyError as e:
            db.session.rollback()
            raise e

        return CreateTalentProfile(talent_profile=new_talent_profile)
