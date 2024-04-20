import graphene
from app.models.assistant_chat_message import AssistantChatMessageRole

AssistantChatMessageRoleType = graphene.Enum.from_enum(AssistantChatMessageRole)


class AssistantChatMessageType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    thread_id = graphene.UUID(required=True)
    role = graphene.Field(AssistantChatMessageRoleType, required=True)
    content = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
