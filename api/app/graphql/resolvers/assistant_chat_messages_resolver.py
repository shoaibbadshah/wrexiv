from typing import List
from app.graphql.types.assistant_chat_message_type import AssistantChatMessageType
from app.models.assistant_chat_thread import AssistantChatThread
from app.models.assistant_chat_message import AssistantChatMessage
import graphene
from flask import g


class AssistantChatMessagesResolver:
    assistant_chat_messages = graphene.List(
        graphene.NonNull(AssistantChatMessageType),
        thread_id=graphene.UUID(required=True),
    )

    def resolve_assistant_chat_messages(
        self, info, thread_id: str
    ) -> List[AssistantChatMessageType]:
        query = AssistantChatMessage.query
        session = query.session

        current_tenant_user_id = g.current_tenant_user.id

        # 指定された thread_id が現在のテナントユーザーに属するかチェックします。
        thread = session.query(AssistantChatThread).filter_by(id=thread_id).first()
        if not thread or thread.tenant_user_id != current_tenant_user_id:
            # テナントユーザーに属さない場合は空のリストを返します。
            return []

        # thread_id に紐づくメッセージをフィルタリングします。
        messages = query.filter_by(assistant_chat_thread_id=thread_id).all()
        return messages
