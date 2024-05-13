import { gql } from "@apollo/client";

const CREATE_DOCUMENRTS = gql`
  mutation CreateDocuments($input: CreateDocumentsInput!) {
    createDocuments(input: $input) {
      success
    }
  }
`;

const DOCUMENT_STATUSES = gql`
  query DocumentStatuses {
    documentStatuses {
      id
      documentName
      status
      createdAt
      updatedAt
    }
  }
`;

export { CREATE_DOCUMENRTS, DOCUMENT_STATUSES };
