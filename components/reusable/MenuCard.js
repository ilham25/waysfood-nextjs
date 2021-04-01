import { useContext } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { CartContext } from "../../contexts/cartContext";

import { cardInit } from "../../utils/animVariants";

const MenuCard = ({ data, idx }) => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { id, title, price, image } = data;
  const handleOrder = () => {
    cartDispatch({
      type: "ADD_CART",
      payload: data,
    });
  };

  return (
    <>
      <Col
        as={motion.div}
        variants={cardInit}
        xs={12}
        md={4}
        lg={3}
        className="mb-4"
      >
        <div>
          <Card
            as={motion.div}
            whileHover={{
              scale: 1.1,
            }}
            transition={{ type: "spring", stiffness: 600 }}
            style={{ border: "none", cursor: "pointer" }}
          >
            <Card.Img
              variant="top"
              src={image}
              height="175"
              className="p-3"
              style={{ objectFit: "cover" }}
            />
            <Card.Body className="px-3 pt-0">
              <Card.Title
                className="heading font-weight-bolder mb-0"
                style={{ height: "40px" }}
              >
                {title}
              </Card.Title>
              <Card.Text className="heading text-danger">
                Rp. {price.toLocaleString()}
              </Card.Text>
              <Button
                variant="warning"
                size="sm"
                className="w-100"
                onClick={handleOrder}
              >
                Order
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </>
  );
};

export default MenuCard;
