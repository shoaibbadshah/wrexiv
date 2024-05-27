from app.models.document_processing_task import DocumentProcessingTask
from app.utilities.validation_utilities import validate_url
from app.lib.document_utils import process_document
from graphql import GraphQLError
from flask import abort, g
from app import db
import graphene
import logging
import uuid

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
        
        # Validate URLs
        for doc in input.documents:
            if not validate_url(doc.url):
                return GraphQLError(f"Invalid URL for document {doc.name}")
        
        for doc in input.documents:
            try:
                document_id = str(uuid.uuid4())
                task = process_document.delay(g.current_agency.id, doc.name, doc.url, document_id)
                document_processing_task = DocumentProcessingTask(id=document_id, celery_task_id=task.id, document_name=doc.name, document_url=doc.url, agency_id=g.current_agency.id)
                db.session.add(document_processing_task)
                db.session.commit()
            except ValueError as e:
                logging.error(f"Error processing document {doc.name}: {e}")
                abort(400, f"Error processing document {doc.name}")

        return CreateDocuments(success=True)
