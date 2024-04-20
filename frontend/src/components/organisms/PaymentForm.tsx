"use client";

import { useRouter } from "next/navigation";

// 使わないページ、テスト
export default function PaymentForm() {
  const router = useRouter();

  const handlePayment = async () => {
    try {
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

  return (
    <button onClick={handlePayment} type="button" className="btn">
      Submit
    </button>
  );
}
