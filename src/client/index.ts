import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://virtualnum.ru/api/v1/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
});
