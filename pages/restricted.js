import { useRouter } from "next/router";
import { useContext } from "react";

import PrivateRoute from "../components/template/Private";

import { UserContext } from "../contexts/userContext";

const Restricted = () => {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  console.log(userState);
  if (userState.isLogin == false) {
    <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>oaewkoawe</h1>
    </>
  );
};

export default Restricted;

// export async function getServerSideProps({ res }) {
//   // On server
//   if (typeof window === "undefined") {
//     res.writeHead(302, { location: "/" });
//     res.end();
//   } else {
//     // On client
//     Router.push("/");
//   }
//   return {};
// }
