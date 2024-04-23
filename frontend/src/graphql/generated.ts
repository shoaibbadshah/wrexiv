import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  __typename?: 'AgencyType';
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AgencyUserType = {
  __typename?: 'AgencyUserType';
  agencyId: Scalars['UUID'];
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['UUID'];
};

export type CreateAgency = {
  __typename?: 'CreateAgency';
  agency?: Maybe<AgencyType>;
};

export type CreateAgencyInput = {
  agencyUser: CreateAgencyUserInput;
  name: Scalars['String'];
};

export type CreateAgencyUserInput = {
  name: Scalars['String'];
};

export type CreateTalentProfile = {
  __typename?: 'CreateTalentProfile';
  talentProfile?: Maybe<TalentProfileType>;
};

export type CreateTalentProfileInput = {
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAgency?: Maybe<CreateAgency>;
  createTalentProfile?: Maybe<CreateTalentProfile>;
};


export type MutationCreateAgencyArgs = {
  input: CreateAgencyInput;
};


export type MutationCreateTalentProfileArgs = {
  input: CreateTalentProfileInput;
};

export type Query = {
  __typename?: 'Query';
  currentAgency?: Maybe<AgencyType>;
  currentAgencyUser?: Maybe<AgencyUserType>;
  talentProfiles?: Maybe<Array<Maybe<TalentProfileType>>>;
  user?: Maybe<UserType>;
};

export type TalentProfileType = {
  __typename?: 'TalentProfileType';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['UUID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserType = {
  __typename?: 'UserType';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['UUID'];
  updatedAt: Scalars['DateTime'];
};

export type CurrentAgencyUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAgencyUserQuery = { __typename?: 'Query', currentAgencyUser?: { __typename?: 'AgencyUserType', id: any, name: string, createdAt: any, updatedAt: any, agencyId: any, userId: any } | null };

export type CurrentAgencyQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAgencyQuery = { __typename?: 'Query', currentAgency?: { __typename?: 'AgencyType', id: any, name: string, createdAt: any, updatedAt: any } | null };

export type CreateAgencyMutationVariables = Exact<{
  input: CreateAgencyInput;
}>;


export type CreateAgencyMutation = { __typename?: 'Mutation', createAgency?: { __typename?: 'CreateAgency', agency?: { __typename?: 'AgencyType', id: any, name: string, createdAt: any, updatedAt: any } | null } | null };

export type TalentProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type TalentProfilesQuery = { __typename?: 'Query', talentProfiles?: Array<{ __typename?: 'TalentProfileType', id: any, name: string, createdAt: any, updatedAt: any } | null> | null };

export type CreateTalentProfileMutationVariables = Exact<{
  input: CreateTalentProfileInput;
}>;


export type CreateTalentProfileMutation = { __typename?: 'Mutation', createTalentProfile?: { __typename?: 'CreateTalentProfile', talentProfile?: { __typename?: 'TalentProfileType', id: any, name: string, createdAt: any, updatedAt: any } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', user?: { __typename?: 'UserType', id: any, email: string, createdAt: any, updatedAt: any } | null };


export const CurrentAgencyUserDocument = gql`
    query CurrentAgencyUser {
  currentAgencyUser {
    id
    name
    createdAt
    updatedAt
    agencyId
    userId
  }
}
    `;

/**
 * __useCurrentAgencyUserQuery__
 *
 * To run a query within a React component, call `useCurrentAgencyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentAgencyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentAgencyUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentAgencyUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentAgencyUserQuery, CurrentAgencyUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentAgencyUserQuery, CurrentAgencyUserQueryVariables>(CurrentAgencyUserDocument, options);
      }
export function useCurrentAgencyUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentAgencyUserQuery, CurrentAgencyUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentAgencyUserQuery, CurrentAgencyUserQueryVariables>(CurrentAgencyUserDocument, options);
        }
export type CurrentAgencyUserQueryHookResult = ReturnType<typeof useCurrentAgencyUserQuery>;
export type CurrentAgencyUserLazyQueryHookResult = ReturnType<typeof useCurrentAgencyUserLazyQuery>;
export type CurrentAgencyUserQueryResult = Apollo.QueryResult<CurrentAgencyUserQuery, CurrentAgencyUserQueryVariables>;
export const CurrentAgencyDocument = gql`
    query CurrentAgency {
  currentAgency {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCurrentAgencyQuery__
 *
 * To run a query within a React component, call `useCurrentAgencyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentAgencyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentAgencyQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentAgencyQuery(baseOptions?: Apollo.QueryHookOptions<CurrentAgencyQuery, CurrentAgencyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentAgencyQuery, CurrentAgencyQueryVariables>(CurrentAgencyDocument, options);
      }
export function useCurrentAgencyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentAgencyQuery, CurrentAgencyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentAgencyQuery, CurrentAgencyQueryVariables>(CurrentAgencyDocument, options);
        }
export type CurrentAgencyQueryHookResult = ReturnType<typeof useCurrentAgencyQuery>;
export type CurrentAgencyLazyQueryHookResult = ReturnType<typeof useCurrentAgencyLazyQuery>;
export type CurrentAgencyQueryResult = Apollo.QueryResult<CurrentAgencyQuery, CurrentAgencyQueryVariables>;
export const CreateAgencyDocument = gql`
    mutation CreateAgency($input: CreateAgencyInput!) {
  createAgency(input: $input) {
    agency {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateAgencyMutationFn = Apollo.MutationFunction<CreateAgencyMutation, CreateAgencyMutationVariables>;

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
export function useCreateAgencyMutation(baseOptions?: Apollo.MutationHookOptions<CreateAgencyMutation, CreateAgencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAgencyMutation, CreateAgencyMutationVariables>(CreateAgencyDocument, options);
      }
export type CreateAgencyMutationHookResult = ReturnType<typeof useCreateAgencyMutation>;
export type CreateAgencyMutationResult = Apollo.MutationResult<CreateAgencyMutation>;
export type CreateAgencyMutationOptions = Apollo.BaseMutationOptions<CreateAgencyMutation, CreateAgencyMutationVariables>;
export const TalentProfilesDocument = gql`
    query TalentProfiles {
  talentProfiles {
    id
    name
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
export function useTalentProfilesQuery(baseOptions?: Apollo.QueryHookOptions<TalentProfilesQuery, TalentProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TalentProfilesQuery, TalentProfilesQueryVariables>(TalentProfilesDocument, options);
      }
export function useTalentProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TalentProfilesQuery, TalentProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TalentProfilesQuery, TalentProfilesQueryVariables>(TalentProfilesDocument, options);
        }
export type TalentProfilesQueryHookResult = ReturnType<typeof useTalentProfilesQuery>;
export type TalentProfilesLazyQueryHookResult = ReturnType<typeof useTalentProfilesLazyQuery>;
export type TalentProfilesQueryResult = Apollo.QueryResult<TalentProfilesQuery, TalentProfilesQueryVariables>;
export const CreateTalentProfileDocument = gql`
    mutation CreateTalentProfile($input: CreateTalentProfileInput!) {
  createTalentProfile(input: $input) {
    talentProfile {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;
export type CreateTalentProfileMutationFn = Apollo.MutationFunction<CreateTalentProfileMutation, CreateTalentProfileMutationVariables>;

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
export function useCreateTalentProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateTalentProfileMutation, CreateTalentProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTalentProfileMutation, CreateTalentProfileMutationVariables>(CreateTalentProfileDocument, options);
      }
export type CreateTalentProfileMutationHookResult = ReturnType<typeof useCreateTalentProfileMutation>;
export type CreateTalentProfileMutationResult = Apollo.MutationResult<CreateTalentProfileMutation>;
export type CreateTalentProfileMutationOptions = Apollo.BaseMutationOptions<CreateTalentProfileMutation, CreateTalentProfileMutationVariables>;
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;