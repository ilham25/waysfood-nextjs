import { useContext } from "react";
import { useMutation } from "@apollo/client";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";

// State Management
import { UserContext } from "../../contexts/userContext";
import { ModalContext } from "../../contexts/modalContext";

// GraphQL Query or Mutation
import { LOGIN_MUTATION } from "../../utils/graphql/mutations";

// Components
import CustomFormInput from "./CustomFormInput";

export default function LoginModal({}) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: modalState, dispatch: modalDispatch } = useContext(
    ModalContext
  );

  const openRegister = () => {
    modalDispatch({ type: "CLOSE_LOGIN" });
    modalDispatch({ type: "OPEN_REGISTER" });
  };

  const [handleLogin, { data, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await handleLogin({
        variables: { email: userData.email, password: userData.password },
      });
      userDispatch({
        type: "LOGIN",
        payload: data.login,
      });
      data && modalDispatch({ type: "CLOSE_LOGIN" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={modalState.loginModal}
      onHide={() => modalDispatch({ type: "CLOSE_LOGIN" })}
      dialogClassName="form-modal"
    >
      <Modal.Body className="px-4 py-5">
        <h2 className="text-warning mb-4">Login</h2>
        {error && <h1>error gan</h1>}
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <CustomFormInput
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <CustomFormInput
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="brown" type="submit" className="mb-3">
            Login
          </Button>
          <Form.Text className="text-muted text-center">
            Don't have an account ? Click{" "}
            <a
              href="#!"
              className="font-weight-bold text-secondary"
              onClick={openRegister}
            >
              Here
            </a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
