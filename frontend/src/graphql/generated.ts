import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  UUID: any;
};

export type AgencyType = {
  __typename?: "AgencyType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type AgencyUserType = {
  __typename?: "AgencyUserType";
  agency: AgencyType;
  agencyId: Scalars["UUID"];
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  language: Language;
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  userId: Scalars["UUID"];
};

export type CreateAgency = {
  __typename?: "CreateAgency";
  agency?: Maybe<AgencyType>;
  success?: Maybe<Scalars["Boolean"]>;
};

export type CreateAgencyInput = {
  agencyUser: CreateAgencyUserInput;
  name: Scalars["String"];
};

export type CreateAgencyUserInput = {
  language: Language;
  name: Scalars["String"];
};

export type CreateDocuments = {
  __typename?: "CreateDocuments";
  success?: Maybe<Scalars["Boolean"]>;
};

export type CreateDocumentsInput = {
  documents?: InputMaybe<Array<InputMaybe<DocumentInput>>>;
};

export type CreateTalentProfile = {
  __typename?: "CreateTalentProfile";
  talentProfile?: Maybe<TalentProfileType>;
};

export type CreateTalentProfileInput = {
  avatar?: InputMaybe<Scalars["String"]>;
  bio?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
};

export type DocumentInput = {
  name: Scalars["String"];
  url: Scalars["String"];
};

export enum Language {
  En = "en",
  Id = "id",
  Jp = "jp",
}

export type Mutation = {
  __typename?: "Mutation";
  createAgency?: Maybe<CreateAgency>;
  createDocuments?: Maybe<CreateDocuments>;
  createTalentProfile?: Maybe<CreateTalentProfile>;
  updateAgency?: Maybe<UpdateAgency>;
  updateAgencyUser?: Maybe<UpdateAgencyUser>;
  updateMyAgency?: Maybe<UpdateMyAgency>;
};

export type MutationCreateAgencyArgs = {
  input: CreateAgencyInput;
};

export type MutationCreateDocumentsArgs = {
  input: CreateDocumentsInput;
};

export type MutationCreateTalentProfileArgs = {
  input: CreateTalentProfileInput;
};

export type MutationUpdateAgencyArgs = {
  input: UpdateAgencyInput;
};

export type MutationUpdateAgencyUserArgs = {
  input: UpdateAgencyUserInput;
};

export type MutationUpdateMyAgencyArgs = {
  input: UpdateMyAgencyInput;
};

export type Query = {
  __typename?: "Query";
  myAgencyUser?: Maybe<AgencyUserType>;
  talentProfiles?: Maybe<Array<TalentProfileType>>;
  user?: Maybe<UserType>;
};

export type TalentProfileType = {
  __typename?: "TalentProfileType";
  avatar?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type UpdateAgency = {
  __typename?: "UpdateAgency";
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateAgencyInput = {
  id: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateAgencyUser = {
  __typename?: "UpdateAgencyUser";
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateAgencyUserInput = {
  id: Scalars["UUID"];
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateMyAgency = {
  __typename?: "UpdateMyAgency";
  success?: Maybe<Scalars["Boolean"]>;
};

export type UpdateMyAgencyInput = {
  agencyUser?: InputMaybe<UpdateMyAgencyUserInput>;
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateMyAgencyUserInput = {
  language: Language;
  name?: InputMaybe<Scalars["String"]>;
};

export type UserType = {
  __typename?: "UserType";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type CreateDocumentsMutationVariables = Exact<{
  input: CreateDocumentsInput;
}>;

export type CreateDocumentsMutation = {
  __typename?: "Mutation";
  createDocuments?: {
    __typename?: "CreateDocuments";
    success?: boolean | null;
  } | null;
};

export type MyAgencyUserQueryVariables = Exact<{ [key: string]: never }>;

export type MyAgencyUserQuery = {
  __typename?: "Query";
  myAgencyUser?: {
    __typename?: "AgencyUserType";
    id: any;
    name: string;
    language: Language;
    createdAt: any;
    updatedAt: any;
    agencyId: any;
    userId: any;
    agency: {
      __typename?: "AgencyType";
      id: any;
      name: string;
      createdAt: any;
      updatedAt: any;
    };
  } | null;
};

export type CreateAgencyMutationVariables = Exact<{
  input: CreateAgencyInput;
}>;

export type CreateAgencyMutation = {
  __typename?: "Mutation";
  createAgency?: {
    __typename?: "CreateAgency";
    success?: boolean | null;
  } | null;
};

export type UpdateMyAgencyMutationVariables = Exact<{
  input: UpdateMyAgencyInput;
}>;

export type UpdateMyAgencyMutation = {
  __typename?: "Mutation";
  updateMyAgency?: {
    __typename?: "UpdateMyAgency";
    success?: boolean | null;
  } | null;
};

export type TalentProfilesQueryVariables = Exact<{ [key: string]: never }>;

export type TalentProfilesQuery = {
  __typename?: "Query";
  talentProfiles?: Array<{
    __typename?: "TalentProfileType";
    id: any;
    name: string;
    bio?: string | null;
    avatar?: string | null;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type CreateTalentProfileMutationVariables = Exact<{
  input: CreateTalentProfileInput;
}>;

export type CreateTalentProfileMutation = {
  __typename?: "Mutation";
  createTalentProfile?: {
    __typename?: "CreateTalentProfile";
    talentProfile?: {
      __typename?: "TalentProfileType";
      id: any;
      name: string;
      bio?: string | null;
      avatar?: string | null;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "UserType";
    id: any;
    email: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export const CreateDocumentsDocument = gql`
  mutation CreateDocuments($input: CreateDocumentsInput!) {
    createDocuments(input: $input) {
      success
    }
  }
`;
export type CreateDocumentsMutationFn = Apollo.MutationFunction<
  CreateDocumentsMutation,
  CreateDocumentsMutationVariables
>;

/**
 * __useCreateDocumentsMutation__
 *
 * To run a mutation, you first call `useCreateDocumentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentsMutation, { data, loading, error }] = useCreateDocumentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDocumentsMutation,
    CreateDocumentsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDocumentsMutation,
    CreateDocumentsMutationVariables
  >(CreateDocumentsDocument, options);
}
export type CreateDocumentsMutationHookResult = ReturnType<
  typeof useCreateDocumentsMutation
>;
export type CreateDocumentsMutationResult =
  Apollo.MutationResult<CreateDocumentsMutation>;
export type CreateDocumentsMutationOptions = Apollo.BaseMutationOptions<
  CreateDocumentsMutation,
  CreateDocumentsMutationVariables
>;
export const MyAgencyUserDocument = gql`
  query myAgencyUser {
    myAgencyUser {
      id
      name
      language
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

/**
 * __useMyAgencyUserQuery__
 *
 * To run a query within a React component, call `useMyAgencyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAgencyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAgencyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAgencyUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyAgencyUserQuery,
    MyAgencyUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyAgencyUserQuery, MyAgencyUserQueryVariables>(
    MyAgencyUserDocument,
    options
  );
}
export function useMyAgencyUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyAgencyUserQuery,
    MyAgencyUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyAgencyUserQuery, MyAgencyUserQueryVariables>(
    MyAgencyUserDocument,
    options
  );
}
export type MyAgencyUserQueryHookResult = ReturnType<
  typeof useMyAgencyUserQuery
>;
export type MyAgencyUserLazyQueryHookResult = ReturnType<
  typeof useMyAgencyUserLazyQuery
>;
export type MyAgencyUserQueryResult = Apollo.QueryResult<
  MyAgencyUserQuery,
  MyAgencyUserQueryVariables
>;
export const CreateAgencyDocument = gql`
  mutation CreateAgency($input: CreateAgencyInput!) {
    createAgency(input: $input) {
      success
    }
  }
`;
export type CreateAgencyMutationFn = Apollo.MutationFunction<
  CreateAgencyMutation,
  CreateAgencyMutationVariables
>;

/**
 * __useCreateAgencyMutation__
 *
 * To run a mutation, you first call `useCreateAgencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAgencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAgencyMutation, { data, loading, error }] = useCreateAgencyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAgencyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAgencyMutation,
    CreateAgencyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAgencyMutation,
    CreateAgencyMutationVariables
  >(CreateAgencyDocument, options);
}
export type CreateAgencyMutationHookResult = ReturnType<
  typeof useCreateAgencyMutation
>;
export type CreateAgencyMutationResult =
  Apollo.MutationResult<CreateAgencyMutation>;
export type CreateAgencyMutationOptions = Apollo.BaseMutationOptions<
  CreateAgencyMutation,
  CreateAgencyMutationVariables
>;
export const UpdateMyAgencyDocument = gql`
  mutation UpdateMyAgency($input: UpdateMyAgencyInput!) {
    updateMyAgency(input: $input) {
      success
    }
  }
`;
export type UpdateMyAgencyMutationFn = Apollo.MutationFunction<
  UpdateMyAgencyMutation,
  UpdateMyAgencyMutationVariables
>;

/**
 * __useUpdateMyAgencyMutation__
 *
 * To run a mutation, you first call `useUpdateMyAgencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMyAgencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMyAgencyMutation, { data, loading, error }] = useUpdateMyAgencyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMyAgencyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMyAgencyMutation,
    UpdateMyAgencyMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMyAgencyMutation,
    UpdateMyAgencyMutationVariables
  >(UpdateMyAgencyDocument, options);
}
export type UpdateMyAgencyMutationHookResult = ReturnType<
  typeof useUpdateMyAgencyMutation
>;
export type UpdateMyAgencyMutationResult =
  Apollo.MutationResult<UpdateMyAgencyMutation>;
export type UpdateMyAgencyMutationOptions = Apollo.BaseMutationOptions<
  UpdateMyAgencyMutation,
  UpdateMyAgencyMutationVariables
>;
export const TalentProfilesDocument = gql`
  query TalentProfiles {
    talentProfiles {
      id
      name
      bio
      avatar
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useTalentProfilesQuery__
 *
 * To run a query within a React component, call `useTalentProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTalentProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTalentProfilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTalentProfilesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TalentProfilesQuery,
    TalentProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TalentProfilesQuery, TalentProfilesQueryVariables>(
    TalentProfilesDocument,
    options
  );
}
export function useTalentProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TalentProfilesQuery,
    TalentProfilesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TalentProfilesQuery, TalentProfilesQueryVariables>(
    TalentProfilesDocument,
    options
  );
}
export type TalentProfilesQueryHookResult = ReturnType<
  typeof useTalentProfilesQuery
>;
export type TalentProfilesLazyQueryHookResult = ReturnType<
  typeof useTalentProfilesLazyQuery
>;
export type TalentProfilesQueryResult = Apollo.QueryResult<
  TalentProfilesQuery,
  TalentProfilesQueryVariables
>;
export const CreateTalentProfileDocument = gql`
  mutation CreateTalentProfile($input: CreateTalentProfileInput!) {
    createTalentProfile(input: $input) {
      talentProfile {
        id
        name
        bio
        avatar
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateTalentProfileMutationFn = Apollo.MutationFunction<
  CreateTalentProfileMutation,
  CreateTalentProfileMutationVariables
>;

/**
 * __useCreateTalentProfileMutation__
 *
 * To run a mutation, you first call `useCreateTalentProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTalentProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTalentProfileMutation, { data, loading, error }] = useCreateTalentProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTalentProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTalentProfileMutation,
    CreateTalentProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTalentProfileMutation,
    CreateTalentProfileMutationVariables
  >(CreateTalentProfileDocument, options);
}
export type CreateTalentProfileMutationHookResult = ReturnType<
  typeof useCreateTalentProfileMutation
>;
export type CreateTalentProfileMutationResult =
  Apollo.MutationResult<CreateTalentProfileMutation>;
export type CreateTalentProfileMutationOptions = Apollo.BaseMutationOptions<
  CreateTalentProfileMutation,
  CreateTalentProfileMutationVariables
>;
export const MeDocument = gql`
  query Me {
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
