import { useContext } from "react";

import { Button } from "react-bootstrap";

// State Management
import { ModalContext } from "../../contexts/modalContext";

const NavButton = () => {
  const { state: modalState, dispatch: modalDispatch } = useContext(
    ModalContext
  );

  return (
    <>
      <Button
        variant="brown mr-2 py-1"
        style={{ width: "100px" }}
        onClick={() => modalDispatch({ type: "OPEN_REGISTER" })}
      >
        Register
      </Button>
      <Button
        variant="brown py-1"
        style={{ width: "100px" }}
        onClick={() => modalDispatch({ type: "OPEN_LOGIN" })}
      >
        Login
      </Button>
    </>
  );
};

export default NavButton;
