import { gql } from "@apollo/client";

const CREATE_ASSISTANT_CHAT_MESSAGE = gql`
  mutation CreateAssistantChatMessage(
    $input: CreateAssistantChatMessageInput!
  ) {
    createAssistantChatMessage(input: $input) {
      assistantChatThread {
        id
        createdAt
        updatedAt
      }
    }
  }
`;

const LIST_ASSISTANT_CHAT_MESSAGES = gql`
  query ListAssistantChatMessages($threadId: UUID!) {
    assistantChatMessages(threadId: $threadId) {
      id
      role
      content
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_ASSISTANT_CHAT_MESSAGE, LIST_ASSISTANT_CHAT_MESSAGES };
