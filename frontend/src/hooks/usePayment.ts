"use client";

import { useRouter } from "next/navigation";

const usePayment = () => {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      // バックエンドサーバーからCheckoutセッションのURLを取得
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
      });

      const sessionUrl = await response.text();
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      router.push(sessionUrl);
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return { handlePayment };
};

export default usePayment;
