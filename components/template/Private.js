import Router from "next/router";
import { useContext, useEffect } from "react";

import { UserContext } from "../../contexts/userContext";

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const isLogin = true;
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
