import Link from "next/link";
import { Navbar, Container } from "react-bootstrap";

import NavButton from "../reusable/NavButton";
import ProfileButton from "../reusable/ProfileButton";

// Assets
const brandLogo = "/assets/svg/brand.svg";

const Header = () => {
  return (
    <>
      <Navbar className="bg-warning py-3">
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
            {/* <NavButton /> */}
            <ProfileButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
