import graphene

from app.graph.mutations.create_agency import CreateAgency
from app.graph.mutations.update_agency import UpdateAgency
from app.graph.mutations.update_agency_user import UpdateAgencyUser
from app.graph.mutations.update_my_agency import UpdateMyAgency
from app.graph.mutations.create_talent_profile import CreateTalentProfile
from app.graph.mutations.create_documents import CreateDocuments
from app.graph.mutations.retry_document import RetryDocument

from app.graph.resolvers.me_resolver import MeResolver
from app.graph.resolvers.talent_profiles_resolver import TalentProfilesResolver
from app.graph.resolvers.my_agency_user_resolver import MyAgencyUserResolver
from app.graph.resolvers.document_statuses_resolver import DocumentStatusesResolver



class Mutation(graphene.ObjectType):
    create_agency = CreateAgency.Field()
    create_talent_profile = CreateTalentProfile.Field()
    update_my_agency = UpdateMyAgency.Field()
    update_agency = UpdateAgency.Field()
    update_agency_user = UpdateAgencyUser.Field()
    create_documents = CreateDocuments.Field()
    retry_document = RetryDocument.Field()


class Query(
    MeResolver,
    TalentProfilesResolver,
    MyAgencyUserResolver,
    DocumentStatusesResolver,

    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
