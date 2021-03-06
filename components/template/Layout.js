import Head from "next/head";

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
