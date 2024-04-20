import { useState } from "react";

const API_HOST = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:3001";

const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const request = async (prompt: string, model: string, params?: any) => {
    setLoading(true);
    setResponse("");

    try {
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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.text();
      setResponse(responseData);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const finalResponse = loading || response.length === 0 ? undefined : response;

  return {
    request,
    loading,
    response,
    finalResponse,
  };
};

export default useOpenAI;
