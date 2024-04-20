import React from "react";
import type { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloHooksProvider,
  from,
  createHttpLink,
  fromPromise,
  FetchResult,
  Observable,
} from "@apollo/client";
import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { setCookie } from "nookies";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { Operation } from "@apollo/client";
import {
  UserWithAccessToken,
  getAccessToken,
  getCurrentUser,
} from "@/lib/firebase";

const URI = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
  ? `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/graphql`
  : "http://localhost:8080/graphql";

const httpLink = createHttpLink({
  headers: {
    "Content-Type": "application/json",
  },
  uri: URI,
  fetchOptions: {
    timeout: 60000, // 60 seconds
  },
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await getAccessToken();

    if (!token) return { headers };

    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    if (error !== "No current user") console.error(error);

    return { headers };
  }
});

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: string, value: string) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map(data => {
    return data;
  });
});

const handleAndReraiseError = (
  message: string,
  context: Record<string, unknown> = {}
) => {
  if (process.env.NODE_ENV === "production") {
    // Sentry.captureMessage(JSON.stringify({ message, context }));
    console.error({ message, context });
  } else {
    // eslint-disable-next-line no-console
    console.error({ message, context });
  }
  throw new Error(`${message}, ${JSON.stringify(context)}`);
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
    const { operationName, variables } = operation as Operation;

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        const errResponse = err.extensions?.response as
          | { statusCode?: number }
          | undefined;

        if (errResponse?.statusCode === 401) {
          return fromPromise(
            getCurrentUser().catch(error => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
            })
          )
            .filter((value: void | UserWithAccessToken | null) =>
              Boolean(value)
            )
            .flatMap((value: void | UserWithAccessToken | null) => {
              if (value && "accessToken" in value) {
                const user: UserWithAccessToken = value;

                setCookie(null, "accessToken", user.accessToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${user.accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              }
              // In case value is not of type UserWithAccessToken, return an empty observable
              return new Observable<
                FetchResult<
                  Record<string, any>,
                  Record<string, any>,
                  Record<string, any>
                >
              >(subscriber => {
                subscriber.complete();
              });
            });
        }
      }
    }

    if (networkError) {
      const errorStatusCode = (networkError as any)?.response?.status;

      if (errorStatusCode === 401) {
        return new Observable<FetchResult>(subscriber => {
          getCurrentUser()
            .then((user: UserWithAccessToken | null) => {
              if (user) {
                setCookie(null, "accessToken", user.accessToken, {
                  maxAge: 30 * 24 * 60 * 60,
                  path: "/",
                });
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${user.accessToken}`,
                  },
                });

                // retry the request, returning the new observable
                forward(operation).subscribe(subscriber);
              } else {
                subscriber.complete();
              }
            })
            .catch(error => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              subscriber.error(error);
            });
        });
      } else {
        handleAndReraiseError(
          `[Network or CORS Error]: ${networkError.message}`,
          {
            operationName,
            variables,
          }
        );
      }
    }
  }
);

export const client = new ApolloClient({
  link: from([errorLink, authLink, cleanTypeName, httpLink]),
  cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }: { children: ReactNode }) => (
  <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
);

export default ApolloProvider;
