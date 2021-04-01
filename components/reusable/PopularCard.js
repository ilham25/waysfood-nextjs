import { useRouter } from "next/router";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Container, Col, Row, Card } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";
import { UserContext } from "../../contexts/userContext";
import { ModalContext } from "../../contexts/modalContext";

import { cardInit } from "../../utils/animVariants";

const PopularCard = ({ data, idx, showAlert }) => {
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
          <Card.Body className="py-3">
            <Row>
              <Col sm={3} className="text-center">
                <img
                  src={image}
                  height="64"
                  width="64"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col sm={9} className="my-auto text-center pl-4">
                <h3 className="heading font-weight-bold my-0">
                  {firstName} {lastName}
                </h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default PopularCard;
