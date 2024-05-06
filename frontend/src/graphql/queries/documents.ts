import { gql } from "@apollo/client";

const CREATE_DOCUMENRTS = gql`
  mutation CreateDocuments($input: CreateDocumentsInput!) {
    createDocuments(input: $input) {
      success
    }
  }
`;

export { CREATE_DOCUMENRTS };
