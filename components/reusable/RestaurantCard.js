import { useRouter } from "next/router";
import { useContext } from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import { ModalContext } from "../../contexts/modalContext";

const RestaurantCard = ({ data, idx, showAlert }) => {
  const router = useRouter();
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: modalState, dispatch: modalDispatch } = useContext(
    ModalContext
  );

  const { id, firstName, lastName, image } = data;

  const handleShowLogin = () => {
    modalDispatch({ type: "OPEN_LOGIN" });
  };

  const handleClick = () => {
    if (userState.isLogin) {
      if (cartState.carts.length == 0) {
        cartDispatch({
          type: "CURRENT_RESTAURANT",
          payload: {
            id,
            fullName: `${firstName} ${lastName}`,
          },
        });
        router.push(`/detail/${id}`);
      } else {
        if (
          cartState.carts.length !== 0 &&
          cartState.currentRestaurant.id === id
        ) {
          cartDispatch({
            type: "CURRENT_RESTAURANT",
            payload: {
              id,
              fullName: `${firstName} ${lastName}`,
            },
          });
          router.push(`/detail/${id}`);
        } else {
          showAlert();
        }
      }
    } else {
      handleShowLogin();
    }
  };
  return (
    <>
      <Col sm={3}>
        <Card
          style={{ border: "none", cursor: "pointer" }}
          onClick={handleClick}
        >
          <Card.Img
            variant="top"
            height="200"
            src={image}
            className="p-3"
            style={{ objectFit: "cover" }}
          />
          <Card.Body className="px-3 pt-0">
            <Card.Title className="heading font-weight-bolder">
              {firstName} {lastName}
            </Card.Title>
            <Card.Text className="heading">Restaurant</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default RestaurantCard;
