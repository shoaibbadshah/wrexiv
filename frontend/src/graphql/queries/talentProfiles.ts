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

const CREATE_TALENT_PROFILE = gql`
  mutation CreateTalentProfile($input: CreateTalentProfileInput!) {
    createTalentProfile(input: $input) {
      talentProfile {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export { TALENT_PROFILES, CREATE_TALENT_PROFILE };
