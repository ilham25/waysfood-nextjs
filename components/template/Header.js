import Link from "next/link";
import { useContext } from "react";

import { Navbar, Container } from "react-bootstrap";

// State Management
import { UserContext } from "../../contexts/userContext";
import { CartContext } from "../../contexts/cartContext";

import NavButton from "../reusable/NavButton";
import ProfileButton from "../reusable/ProfileButton";

// Assets
const brandLogo = "/assets/svg/brand.svg";

const Header = () => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  return (
    <>
      <Navbar className="bg-warning py-2">
        <Container fluid className="px-3">
          <Link href="/">
            <a>
              <Navbar.Brand>
                <img src={brandLogo} height="40" alt="logo" />
              </Navbar.Brand>
            </a>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {userState.isLogin ? <ProfileButton /> : <NavButton />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
