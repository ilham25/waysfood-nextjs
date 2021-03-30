import { useRouter } from "next/router";
import { useContext } from "react";

import { Container, Col, Row, Card, Button } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";

const RestaurantCard = ({ data, idx }) => {
  const router = useRouter();
  const { state: cartContext, dispatch: cartDispatch } = useContext(
    CartContext
  );

  const { id, firstName, lastName } = data;

  const handleClick = () => {
    cartDispatch({
      type: "CURRENT_RESTAURANT",
      payload: {
        id,
        fullName: `${firstName} ${lastName}`,
      },
    });
    router.push(`/detail/${id}`);
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
            src={`https://picsum.photos/200?random=${idx}`}
            className="p-3"
            style={{ objectFit: "cover" }}
          />
          <Card.Body className="px-3 pt-0">
            <Card.Title className="heading font-weight-bolder">
              {firstName} {lastName}
            </Card.Title>
            <Card.Text className="heading">Makanan</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default RestaurantCard;
