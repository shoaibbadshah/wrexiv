import { gql } from "@apollo/client";

const GET_ADMIN_USER = gql`
  query GetAdminUser {
    adminUser {
      id
      name
    }
  }
`;

export { GET_ADMIN_USER };
