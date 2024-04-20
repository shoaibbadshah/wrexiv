import { gql } from "@apollo/client";

const GENERATE_LEADS = gql`
  mutation GenerateLeads($input: GenerateLeadsInput!) {
    generateLeads(input: $input) {
      leads {
        id
        email
        name
        channel
        avatar
        country
        region
        title
        description
        linkedinUrl
        createdAt
        updatedAt
        organization {
          name
          phone
          logo
          industry
          description
          country
          region
          linkedinUrl
          website
        }
      }
    }
  }
`;

const LIST_LEADS = gql`
  query ListLeads {
    leads {
      id
      email
      name
      channel
      avatar
      country
      region
      title
      description
      linkedinUrl
      organization {
        name
        phone
        logo
        industry
        description
        country
        region
        linkedinUrl
        website
      }
      createdAt
      updatedAt
    }
  }
`;

const GET_LEAD = gql`
  query GetLead($id: UUID!) {
    lead(id: $id) {
      id
      email
      name
      channel
      avatar
      country
      region
      title
      description
      linkedinUrl
      organization {
        name
        phone
        logo
        industry
        description
        country
        region
        linkedinUrl
        website
      }
      createdAt
      updatedAt
    }
  }
`;

export { GENERATE_LEADS, LIST_LEADS, GET_LEAD };
