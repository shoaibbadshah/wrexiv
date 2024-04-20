import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { setContext } from "@apollo/client/link/context";

const URI = process.env.NEXT_PUBLIC_GRAPHQL_API_URL
  ? `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/query`
  : "http://localhost:8080/query";

export const createApolloClient = (accessToken?: string | null) => {
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const httpLink = new HttpLink({ uri: URI });
  const link = from([authLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
};

export const { getClient } = registerApolloClient((accessToken?: string) => {
  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  const httpLink = new HttpLink({ uri: URI });

  const link = from([authLink, httpLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
});
