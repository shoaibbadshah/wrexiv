from app.graphql.types.assistant_chat_thread_type import AssistantChatThreadType
from app.models.assistant_chat_thread import AssistantChatThread
import graphene
from flask import g
from graphql import GraphQLError


class AssistantChatThreadsResolver:
    assistant_chat_threads = graphene.List(AssistantChatThreadType)

    def resolve_assistant_chat_threads(self, info):
        query = AssistantChatThread.query
        session = query.session

        if g.get("current_tenant_user") is None:
            return GraphQLError("Tenant user not found")

        threads = (
            session.query(AssistantChatThread)
            .filter_by(tenant_user_id=g.current_tenant_user.id)
            .all()
        )
        return threads
