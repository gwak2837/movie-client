import { ApolloClient, createHttpLink, GraphQLRequest } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache, currentUserVar } from "apollo/cache";

// Authenticate using HTTP header
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_: GraphQLRequest, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = currentUserVar()?.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});
