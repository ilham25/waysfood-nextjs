import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://wfood1617091945703.kelasq.microgen.id/graphql",
  cache: new InMemoryCache(),
});

export default client;
