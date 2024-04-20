import { gql } from "@apollo/client";

const CREATE_ASSISTANT_CHAT_THREAD = gql`
  mutation CreateAssistantChatThread($input: CreateAssistantChatThreadInput!) {
    createAssistantChatThread(input: $input) {
      assistantChatThread {
        id
        scenario
        createdAt
        updatedAt
      }
    }
  }
`;

const LIST_ASSISTANT_CHAT_THREADS = gql`
  query ListAssistantChatThreads {
    assistantChatThreads {
      id
      scenario
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_ASSISTANT_CHAT_THREAD, LIST_ASSISTANT_CHAT_THREADS };
