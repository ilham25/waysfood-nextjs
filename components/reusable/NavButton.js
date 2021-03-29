import { Button } from "react-bootstrap";

const NavButton = ({}) => {
  return (
    <>
      <Button variant="brown mr-2 py-1" style={{ width: "100px" }}>
        Register
      </Button>
      <Button variant="brown py-1" style={{ width: "100px" }}>
        Login
      </Button>
    </>
  );
};

export default NavButton;
