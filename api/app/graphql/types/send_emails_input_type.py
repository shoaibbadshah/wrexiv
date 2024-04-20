import graphene


class SendEmailsInputType(graphene.InputObjectType):
    emails = graphene.List(graphene.NonNull(graphene.String), required=True)
    subject = graphene.String(required=True)
    body = graphene.String(required=True)
