import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://wfood1617091945703.kelasq.microgen.id/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  let token;
  if (typeof window !== "undefined") {
    token = "Bearer " + localStorage.getItem("token");
  }
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: token || null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
