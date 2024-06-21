import {
  AssistantChatMessageRole,
  AssistantChatScenario,
  CreateAssistantChatThread,
  useCreateAssistantChatMessageMutation,
  useCreateAssistantChatThreadMutation,
  useListAssistantChatMessagesQuery,
} from "@/graphql/generated";
import useChatGpt from "./useChatGpt";
import { useMemo, useState } from "react";

type PropsType = {
  turnLimit?: number;
};

const useChatConversation = ({ turnLimit }: PropsType = {}) => {
  const [thread, setThread] =
    useState<CreateAssistantChatThread["assistantChatThread"]>(undefined);
  const [hasFinished, setHasFinished] = useState(false);

  const { data: messagesData, refetch } = useListAssistantChatMessagesQuery({
    variables: {
      threadId: thread?.id,
    },
    skip: !thread,
  });
  const messages = messagesData?.assistantChatMessages;
  const userMessagesCount = useMemo(() => {
    if (!messages) return 0;

    return messages.filter(m => m.role === AssistantChatMessageRole.User)
      .length;
  }, [messages]);

  const isNextTurnLast = useMemo(() => {
    if (!turnLimit || !messages) return false;

    const userMessagesCount = messages.filter(
      m => m.role === AssistantChatMessageRole.User
    ).length;

    return userMessagesCount + 1 >= turnLimit;
  }, [messages, turnLimit]);

  const { request, response, finalResponse, loading } = useChatGpt({
    onCompleted: (message, threadId) => {
      createMessage({
        variables: {
          input: {
            threadId,
            message,
            role: AssistantChatMessageRole.Assistant,
          },
        },
        onCompleted: () => {
          refetch();
        },
      });
    },
  });

  const [createThread] = useCreateAssistantChatThreadMutation();
  const [createMessage, { loading: creatingMessage }] =
    useCreateAssistantChatMessageMutation();

  const handleStart = () => {
    createThread({
      variables: {
        input: {
          scenario: AssistantChatScenario.Onboarding,
        },
      },
      onCompleted: data => {
        console.log(data);
        const thread = data.createAssistantChatThread?.assistantChatThread;
        if (thread) {
          setThread(thread);
          request({
            thread_id: thread.id,
          });
        }
      },
    });
  };

  const sendUserMessage = (message: string) => {
    // If the user has reached the turn limit, send the message without waiting for the assistant's response
    if (isNextTurnLast) {
      createMessage({
        variables: {
          input: {
            threadId: thread?.id,
            message,
            role: AssistantChatMessageRole.User,
          },
        },
        onCompleted: () => {
          refetch();
          setHasFinished(true);
        },
      });
      return;
    }

    createMessage({
      variables: {
        input: {
          threadId: thread?.id,
          message,
          role: AssistantChatMessageRole.User,
        },
      },
      onCompleted: data => {
        refetch();

        if (thread) {
          request({
            thread_id: thread.id,
          });
        }
      },
    });
  };

  return {
    request,
    response,
    finalResponse,
    loading,
    handleStart,
    sendUserMessage,
    messages,
    creatingMessage,
    hasFinished,
  };
};

export default useChatConversation;
