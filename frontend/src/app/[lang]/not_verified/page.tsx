"use client";

import { firebaseAuth, getCurrentUser } from "@/lib/firebase";
import { User, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";

const NotVerifiedPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };
  const resendVerificationEmail = async () => {
    try {
      if (!user) return;
      await sendEmailVerification(user);
      alert("Verification email sent!");
    } catch (error) {
      console.error("Error sending email verification", error);
      alert("Error sending verification email.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>Not Verified Page</h1>
      <button onClick={resendVerificationEmail}>
        Resend Verification Email
      </button>
    </div>
  );
};

export default NotVerifiedPage;
