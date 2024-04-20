import { useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:3001";

const useStreamingMessage = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [finalResponse, setFinalResponse] = useState("");

  const request = async (prompt: string, model: string, params?: any) => {
    if (prompt.length === 0) return;
    if (loading) return;

    setLoading(true);
    setResponse("");

    const response = await fetch(`${API_HOST}/chain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        prompt,
        params,
      }),
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

    if (!finalText || finalText.length === 0) return;
  };

  return {
    request,
    loading,
    response,
    finalResponse,
  };
};

export default useStreamingMessage;
