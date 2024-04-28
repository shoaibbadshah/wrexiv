import { gql } from "@apollo/client";

const MY_AGENCY_USER = gql`
  query myAgencyUser {
    myAgencyUser {
      id
      name
      createdAt
      updatedAt
      agencyId
      userId
      agency {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_AGENCY_USER = gql`
  mutation CreateAgency($input: CreateAgencyInput!) {
    createAgency(input: $input) {
      success
    }
  }
`;

export { MY_AGENCY_USER, CREATE_AGENCY_USER };
