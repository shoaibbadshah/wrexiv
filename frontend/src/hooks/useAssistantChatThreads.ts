import {
  ListAssistantChatThreadsQuery,
  useListAssistantChatThreadsQuery,
} from "@/graphql/generated";

type PropsType = {
  onCompleted?: (
    data: ListAssistantChatThreadsQuery["assistantChatThreads"]
  ) => void;
};

const useAssistantChatThreads = ({ onCompleted }: PropsType = {}) => {
  const { data, loading, refetch } = useListAssistantChatThreadsQuery({
    onCompleted: data => {
      onCompleted && onCompleted(data.assistantChatThreads);
    },
  });
  const threads = data?.assistantChatThreads;

  return {
    threads,
    loading,
    refetch,
  };
};

export default useAssistantChatThreads;
