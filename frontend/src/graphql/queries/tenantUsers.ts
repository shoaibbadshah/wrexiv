import { gql } from "@apollo/client";

const MY_TENANT_USER = gql`
  query MyTenantUser {
    tenantUser {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

export { MY_TENANT_USER };
