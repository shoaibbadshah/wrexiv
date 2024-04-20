from app.models.assistant_chat_thread import AssistantChatScenario
import graphene

AssistantChatScenarioType = graphene.Enum.from_enum(AssistantChatScenario)


class AssistantChatThreadType(graphene.ObjectType):
    id = graphene.UUID(required=True)
    scenario = graphene.Field(AssistantChatScenarioType, required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
