import { ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

// State Management
import { UserContextProvider } from "../contexts/userContext";
import { CartContextProvider } from "../contexts/cartContext";
import { ModalContextProvider } from "../contexts/modalContext";

// Apollo Client
import client from "../utils/apollo-client";

import Layout from "../components/template/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <CartContextProvider>
            <ModalContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ModalContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
