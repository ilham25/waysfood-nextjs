import { useContext } from "react";

import { Modal, Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";

// State Management
import { UserContext } from "../../contexts/userContext";
import { ModalContext } from "../../contexts/modalContext";

// Components
import CustomFormInput from "./CustomFormInput";
import { REGISTER_MUTATION } from "../../utils/graphql/mutations";

// Assets
const imgProfile = "/assets/img/profile.png";

export default function RegisterModal() {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: modalState, dispatch: modalDispatch } = useContext(
    ModalContext
  );

  const openLogin = () => {
    modalDispatch({ type: "CLOSE_REGISTER" });
    modalDispatch({ type: "OPEN_LOGIN" });
  };

  const [handleRegister, { error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
    };
    try {
      const { data } = await handleRegister({
        variables: { ...userData, phoneNumber: userData.phone },
      });
      userDispatch({
        type: "LOGIN",
        payload: data.register,
      });
      data && modalDispatch({ type: "CLOSE_REGISTER" });
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      show={modalState.registerModal}
      onHide={() => modalDispatch({ type: "CLOSE_REGISTER" })}
      dialogClassName="form-modal"
    >
      <Modal.Body className="px-4 py-5">
        <h2 className="text-warning mb-4">Register</h2>
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
              required
            />
          </Form.Group>
          <Form.Group controlId="fullname">
            <CustomFormInput
              type="text"
              placeholder="First Name"
              name="firstName"
              required
            />
          </Form.Group>
          <Form.Group controlId="fullname">
            <CustomFormInput
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
            />
          </Form.Group>
          <Form.Group controlId="phone">
            <CustomFormInput
              type="text"
              placeholder="Phone"
              name="phone"
              required
            />
          </Form.Group>
          <Form.Group controlId="role" name="role">
            <Form.Control
              as="select"
              style={{
                height: "50px",
                boxShadow: "none",
                backgroundColor: "rgba(210, 210, 210, 0.25)",
                border: "3px solid #D2D2D2",
              }}
            >
              <option value="USER">As User</option>
              <option value="PARTNER">As Partner</option>
            </Form.Control>
          </Form.Group>
          <Button variant="brown" type="submit" className="mb-3">
            Register
          </Button>
          <Form.Text className="text-muted text-center">
            Already have an account ? Click{" "}
            <a
              href="#!"
              className="font-weight-bold text-secondary"
              onClick={openLogin}
            >
              Here
            </a>
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
