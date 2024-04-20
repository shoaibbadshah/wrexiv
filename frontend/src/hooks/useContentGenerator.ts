import {
  AssistantChatScenario,
  AssistantChatMessageRole,
  CreateAssistantChatThread,
  GenerateContentMutation,
  useCreateAssistantChatMessageMutation,
  useCreateAssistantChatThreadMutation,
  useGenerateContentMutation,
  useListAssistantChatMessagesQuery,
} from "@/graphql/generated";
import { useState } from "react";
import { useContentGenerationState } from "@/store/contentGenerationSlice";

type PostsType = NonNullable<
  GenerateContentMutation["generateContent"]
>["posts"];

const useContentGenerator = () => {
  const { platforms, languages } = useContentGenerationState();
  const [thread, setThread] =
    useState<CreateAssistantChatThread["assistantChatThread"]>(undefined);
  const [posts, setPosts] = useState<PostsType | undefined>(undefined);

  const [createThread] = useCreateAssistantChatThreadMutation();
  const [createMessage] = useCreateAssistantChatMessageMutation();
  const [generateContent, { loading }] = useGenerateContentMutation();

  const { data: messagesData, refetch } = useListAssistantChatMessagesQuery({
    variables: {
      threadId: thread?.id,
    },
    skip: !thread,
  });
  const messages = messagesData?.assistantChatMessages;

  const handleRequest = (input: string) => {
    setPosts(undefined);
    createThread({
      variables: {
        input: {
          scenario: AssistantChatScenario.ContentGeneration,
        },
      },
      onCompleted: data => {
        const message = `Can you generate posts for ${platforms.join(
          ", "
        )} in ${languages.join(", ")}?\n\n${input}`;
        createMessage({
          variables: {
            input: {
              threadId: data.createAssistantChatThread?.assistantChatThread?.id,
              message,
              role: AssistantChatMessageRole.User,
            },
          },
          onCompleted: data => {
            const threadId =
              data.createAssistantChatMessage?.assistantChatThread?.id;

            if (!threadId) return;

            generateContent({
              variables: {
                input: {
                  threadId,
                  inputText: message,
                },
              },
              onCompleted: data => {
                setPosts(data.generateContent?.posts);
              },
            });
          },
        });
      },
    });
  };

  return {
    handleRequest,
    messages,
    posts,
    loading,
  };
};

export default useContentGenerator;
