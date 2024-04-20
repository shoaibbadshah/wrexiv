"use client";

import { useGenerateLeadsMutation } from "@/graphql/generated";
import Link from "next/link";

const CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || "";

const LinkedinTest = () => {
  const authParams = {
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "r_liteprofile r_emailaddress",
    state: Math.random().toString(36).substring(7),
  };

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${new URLSearchParams(
    authParams
  ).toString()}`;

  const [generateLeads] = useGenerateLeadsMutation();

  const handleGenerateLeads = async () => {
    generateLeads();
  };

  return (
    <div className="m-8">
      <h1>Linkedin Test</h1>
      <Link href={authUrl}>
        <button className="btn">Auth</button>
      </Link>
      <div className="my-8">
        <button onClick={handleGenerateLeads}>Social Search Test</button>
      </div>
    </div>
  );
};

export default LinkedinTest;
