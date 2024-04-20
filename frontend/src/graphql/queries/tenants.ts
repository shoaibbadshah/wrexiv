import { gql } from "@apollo/client";

const CREATE_TENANT = gql`
  mutation CreateTenant($input: CreateTenantInput!) {
    createTenant(input: $input) {
      tenant {
        id
        name
        website
        createdAt
        updatedAt
      }
    }
  }
`;

const MY_TENANT = gql`
  query MyTenant {
    tenant {
      id
      name
      website
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_TENANT, MY_TENANT };
