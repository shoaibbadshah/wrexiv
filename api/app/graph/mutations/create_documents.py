from app.lib.document_utils import process_document
from graphql import GraphQLError
from flask import abort, g
import graphene
import logging

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
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to create documents")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        for doc in input.documents:
            try:
                process_document.delay(g.current_agency.id, doc.name, doc.url)
            except ValueError as e:
                logging.error(f"Error processing document {doc.name}: {e}")
                abort(400, f"Error processing document {doc.name}")

        return CreateDocuments(success=True)
