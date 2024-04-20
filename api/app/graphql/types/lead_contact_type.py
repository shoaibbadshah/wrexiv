import graphene


class LeadContactType(graphene.ObjectType):
    email = graphene.String(required=True)
    name = graphene.String(required=True)
