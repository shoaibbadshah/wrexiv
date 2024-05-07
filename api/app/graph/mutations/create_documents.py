from app.lib.document_utils import extract_document_content, check_document_type, process_document
from app.lib.chat_gpt import ChatGpt
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
            document_type = check_document_type(doc.name)
            try:
                document_text = extract_document_content(document_type, doc.url)
                chat_gpt = ChatGpt()
                document_json = chat_gpt.document_text_to_json(document_text)
                process_document(g.current_agency.id, doc.url, doc.name, document_json)
            except ValueError as e:
                logging.error(f"Error processing document {doc.name}: {e}")
                abort(400, f"Error processing document {doc.name}")

        return CreateDocuments(success=True)
