import graphene
from app.infra.database import db
from sqlalchemy.exc import SQLAlchemyError
from flask import g
from graphql import GraphQLError
from app.graphql.types.assistant_chat_thread_type import (
    AssistantChatScenarioType,
    AssistantChatThreadType,
)
from app.models.assistant_chat_thread import AssistantChatThread
from app.models.assistant_chat_message import (
    AssistantChatMessage,
    AssistantChatMessageRole,
)


class CreateAssistantChatThreadInput(graphene.InputObjectType):
    scenario = graphene.Field(AssistantChatScenarioType, required=True)


class CreateAssistantChatThread(graphene.Mutation):
    class Arguments:
        input = CreateAssistantChatThreadInput(required=True)

    assistant_chat_thread = graphene.Field(AssistantChatThreadType)

    def mutate(root, info, input):
        try:
            thread = AssistantChatThread(
                scenario=input.scenario, tenant_user_id=g.current_tenant_user.id
            )
            db.session.add(thread)
            db.session.flush()

            message = AssistantChatMessage(
                role=AssistantChatMessageRole.system.name,
                content=thread.build_system_message(),
                assistant_chat_thread_id=thread.id,
            )
            db.session.add(message)

            # トランザクションコミット
            db.session.commit()

            return CreateAssistantChatThread(assistant_chat_thread=thread)

        except SQLAlchemyError as e:
            # エラーが発生した場合はロールバック
            db.session.rollback()
            raise GraphQLError("Failed to create chat thread and message: " + str(e))
