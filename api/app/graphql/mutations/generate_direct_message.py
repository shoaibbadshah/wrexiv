from app.graphql.types.direct_message_type import DirectMessageType
import graphene
from flask import g


class GenerateDirectMessageInput(graphene.InputObjectType):
    lead_id = graphene.UUID(required=True)


class GenerateDirectMessage(graphene.Mutation):
    class Arguments:
        input = GenerateDirectMessageInput(required=True)

    direct_messages = graphene.Field(graphene.List(graphene.NonNull(DirectMessageType)))

    def mutate(self, info, input):

        # to personalize the message
        lead = g.current_tenant.leads.filter_by(id=input.lead_id).first()

        direct_messages = [
            DirectMessageType(
                language=lead.language,
                subject="Mock Subject",
                body="Mock Body",
            ),
            DirectMessageType(
                language="en",  # should be current_user.language
                subject="Mock Subject",
                body="Mock Body",
            ),
        ]

        return GenerateDirectMessage(direct_messages=direct_messages)
