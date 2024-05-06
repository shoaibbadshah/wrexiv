from app.graph.types.talent_profile_type import TalentProfileType
from app.classes.Document import Document
import graphene

class DocumentInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    url = graphene.String(required=True)

class CreateDocumentsInput(graphene.InputObjectType):
    documents = graphene.List(DocumentInput)

class CreateDocuments(graphene.Mutation):
    class Arguments:
        input = CreateDocumentsInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        for doc in input.documents:
            Document(doc.name, doc.url).process_document()
        
        return CreateDocuments(success=True)
