import { gql } from "@apollo/client";

const TALENT_PROFILES = gql`
  query TalentProfiles {
    talentProfiles {
      id
      name
      bio
      avatar
      email
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
        bio
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;

export { TALENT_PROFILES, CREATE_TALENT_PROFILE };
