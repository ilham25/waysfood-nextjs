import { useRouter } from "next/router";
import { useContext } from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import { ModalContext } from "../../contexts/modalContext";

import { cardInit } from "../../utils/animVariants";

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
      if (userState.loggedUser.role !== "PARTNER") {
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
            showAlert(
              "Your cart is not empty!",
              "Please empty your cart before changing restaurant"
            );
          }
        }
      } else {
        showAlert("You are a partner!", "Can't order as a partner");
      }
    } else {
      handleShowLogin();
    }
  };
  return (
    <>
      <Col as={motion.div} variants={cardInit} sm={3} className="mb-4">
        <Card
          style={{ border: "none", cursor: "pointer" }}
          onClick={handleClick}
          as={motion.div}
          whileHover={{
            scale: 1.1,
          }}
          transition={{ type: "spring", stiffness: 600 }}
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
