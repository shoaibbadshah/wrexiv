import { gql } from "@apollo/client";

const ME = gql`
  query Me {
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

export { ME };
