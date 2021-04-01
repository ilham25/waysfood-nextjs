import Head from "next/head";
import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { UserContext } from "../../contexts/userContext";

import { EACH_USER } from "../../utils/graphql/queries";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>WaysFood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
