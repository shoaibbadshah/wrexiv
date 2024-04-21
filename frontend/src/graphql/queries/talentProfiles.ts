import { gql } from "@apollo/client";

const TALENT_PROFILES = gql`
  query TalentProfiles {
    talentProfiles {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export { TALENT_PROFILES };
