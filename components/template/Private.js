import Router from "next/router";

import client from "../../utils/apollo-client";
import { EACH_USER } from "../../utils/graphql/queries";

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const isLogin = false;

    if (!isLogin) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: "/",
        });
        context.res?.end();
      } else {
        Router.replace("/");
      }
    }
    return {};
  };

  return hocComponent;
};
