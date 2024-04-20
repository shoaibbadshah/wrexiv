import graphene
from app.infra.database import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from graphql import GraphQLError
from app.graphql.types.assistant_chat_thread_type import AssistantChatThreadType
from app.models.assistant_chat_message import (
    AssistantChatMessage,
    AssistantChatMessageRole,
)
from app.models.assistant_chat_thread import AssistantChatThread
from app.graphql.types.assistant_chat_message_type import (
    AssistantChatMessageRoleType,
)


class CreateAssistantChatMessageInput(graphene.InputObjectType):
    message = graphene.String(required=True)
    thread_id = graphene.UUID(required=True)
    role = graphene.Field(lambda: AssistantChatMessageRoleType, required=True)


class CreateAssistantChatMessage(graphene.Mutation):
    class Arguments:
        input = CreateAssistantChatMessageInput(required=True)

    assistant_chat_thread = graphene.Field(AssistantChatThreadType)

    def mutate(root, info, input):
        try:
            thread = AssistantChatThread.query.filter_by(id=input.thread_id).first()
            if not thread:
                raise GraphQLError("Thread not found")

            role_value = AssistantChatMessageRole[input.role].name

            message = AssistantChatMessage(
                role=role_value,
                content=input.message,
                assistant_chat_thread_id=thread.id,
            )
            db.session.add(message)
            db.session.commit()

            return CreateAssistantChatMessage(assistant_chat_thread=thread)

        except SQLAlchemyError as e:
            db.session.rollback()
            raise GraphQLError("Failed to create chat message: " + str(e))
