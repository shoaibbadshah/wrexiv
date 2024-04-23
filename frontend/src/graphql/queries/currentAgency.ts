import { gql } from "@apollo/client";

const CURRENT_AGENCY_USER = gql`
  query CurrentAgencyUser {
    currentAgencyUser {
      id
      name
      createdAt
      updatedAt
      agencyId
      userId
    }
  }
`;

const CURRENT_AGENCY = gql`
  query CurrentAgency {
    currentAgency {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

const CREATE_AGENCY_USER = gql`
  mutation CreateAgency($input: CreateAgencyInput!) {
    createAgency(input: $input) {
      agency {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export { CURRENT_AGENCY_USER, CURRENT_AGENCY, CREATE_AGENCY_USER };
