from app.models.document_processing_task import DocumentProcessingTask
from app.lib.document_utils import process_document
from graphql import GraphQLError
from flask import abort, g
from app import db
import graphene
import logging
from celery.result import AsyncResult

class RetryDocumentInput(graphene.InputObjectType):
    id = graphene.UUID(required=True)

class RetryDocument(graphene.Mutation):
    class Arguments:
        input = RetryDocumentInput(required=True)

    success = graphene.Boolean()

    def mutate(self, info, input):
        if g.get("current_user") is None:
            return GraphQLError("User must be logged in to retry a documents")
        
        if g.get("current_agency") is None:
            return GraphQLError("User is not associated with an agency")
        
        document_processing_task = DocumentProcessingTask().query.filter_by(id=input.id).first()
        if document_processing_task is None:
            return GraphQLError("Document not found")
        
        document_state = AsyncResult(str(document_processing_task.celery_task_id)).state
        if document_state != "FAILURE":
            return GraphQLError("Document is not in a failed state")
        
        try:
            task = process_document.delay(g.current_agency.id, document_processing_task.document_name, document_processing_task.document_url, document_processing_task.id)
            document_processing_task.celery_task_id = task.id
            db.session.commit()
        except ValueError as e:
            logging.error(f"Error processing document {document_processing_task.document_name}: {e}")
            abort(400, f"Error processing document {document_processing_task.document_name}")


        return RetryDocument(success=True)
