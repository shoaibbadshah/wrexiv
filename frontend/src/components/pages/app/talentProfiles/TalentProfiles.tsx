"use client";

import { useTalentProfilesQuery } from "@/graphql/generated";

const TalentProfiles = () => {
  const { data } = useTalentProfilesQuery();
  console.log(data);
  return (
    <div>
      <h1>Talent Profiles</h1>
    </div>
  );
};

export default TalentProfiles;
