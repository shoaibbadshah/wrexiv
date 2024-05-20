import { gql } from "@apollo/client";

const CREATE_DOCUMENRTS = gql`
  mutation CreateDocuments($input: CreateDocumentsInput!) {
    createDocuments(input: $input) {
      success
    }
  }
`;

const DOCUMENT_STATUSES = gql`
  query DocumentStatuses($limit: Int, $offset: Int) {
    documentStatuses(limit: $limit, offset: $offset) {
      id
      documentName
      status
      createdAt
      updatedAt
    }
  }
`;

const RETRY_DOCUMENT = gql`
  mutation RetryDocument($input: RetryDocumentInput!) {
    retryDocument(input: $input) {
      success
    }
  }
`;

export { CREATE_DOCUMENRTS, DOCUMENT_STATUSES, RETRY_DOCUMENT };
