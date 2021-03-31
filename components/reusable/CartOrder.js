import { useContext } from "react";

import { Row, Col, Button } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";

// Assets
const iconRemove = "/assets/svg/remove.svg";

export default function CartOrder({ data, idx }) {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { id, title, price, qty, image } = data;

  const handleRemoveCart = () => {
    cartDispatch({
      type: "REMOVE_CART",
      payload: data,
    });
  };

  const handleAddCart = () => {
    cartDispatch({
      type: "ADD_CART",
      payload: data,
    });
  };

  const handleDeleteCart = () => {
    cartDispatch({
      type: "DELETE_CART",
      payload: data,
    });
  };

  return (
    <div>
      <Row>
        <Col xs={3} md={2}>
          <img
            src={image}
            alt="order 1"
            style={{
              backgroundSize: "cover",
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </Col>
        <Col xs={9} md={10} className="py-2">
          <Row>
            <Col xs={6} md={6}>
              <p className="heading font-weight-bold">{title}</p>
            </Col>
            <Col xs={6} md={6}>
              <p className="text-danger text-right">
                Rp. {price.toLocaleString()}
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6} className="d-flex align-items-center ">
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleRemoveCart}
              >
                -
              </Button>
              <p
                className="mb-0 px-3 mx-2"
                style={{
                  backgroundColor: "#F6E6DA",
                  borderRadius: "5px",
                }}
              >
                {qty}
              </p>
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleAddCart}
              >
                +
              </Button>
            </Col>
            <Col xs={6} md={6} className="text-right my-auto">
              <Button
                variant="light"
                className="font-weight-bold h3 mb-0 text-brown"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={handleDeleteCart}
              >
                <img src={iconRemove} alt="remove icon" height="20" />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <hr className="divider" />
        </Col>
      </Row>
    </div>
  );
}
