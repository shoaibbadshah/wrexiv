import { AssistantChatThreadType } from "@/graphql/generated";
import { useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Have to be snake_case without graphql
type Params = {
  thread_id?: string;
  scenario?: string;
  prompt?: string;
};

type PropsType = {
  onCompleted?: (message: string, threadId: string) => void;
};

const useChatGpt = ({ onCompleted } = {} as PropsType) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [finalResponse, setFinalResponse] = useState("");

  const request = async (params: Params) => {
    if (loading) return;

    setLoading(true);
    setResponse("");

    const response = await fetch(`${API_HOST}/chain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.body) {
      setLoading(false);
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let finalText = "";

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const decoded = decoder.decode(value, { stream: true });
      finalText += decoded;
      setResponse(finalText);
    }

    setLoading(false);
    setFinalResponse(finalText);
    onCompleted && onCompleted(finalText, params.thread_id || "");

    if (!finalText || finalText.length === 0) return;
  };

  return {
    request,
    loading,
    response,
    finalResponse,
  };
};

export default useChatGpt;
