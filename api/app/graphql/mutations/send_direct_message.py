import graphene
from flask import g


class SendDirectMessageInput(graphene.InputObjectType):
    lead_id = graphene.UUID(required=True)
    subject = graphene.String(required=True)
    body = graphene.String(required=True)


class SendDirectMessage(graphene.Mutation):
    class Arguments:
        input = SendDirectMessageInput(required=True)

    success = graphene.Boolean(required=True)

    def mutate(self, info, input):

        lead = g.current_tenant.leads.filter_by(id=input.lead_id).first()

        # send direct message to lead
        # send_direct_message(lead, input.subject, input.body)

        return SendDirectMessage(success=True)
