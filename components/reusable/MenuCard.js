import { useContext } from "react";
import { Col, Card, Button } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";

const MenuCard = ({ data, idx }) => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { id, title, price } = data;
  const handleOrder = () => {
    cartDispatch({
      type: "ADD_CART",
      payload: data,
    });
  };

  return (
    <>
      <Col xs={12} md={4} lg={3} className="mb-4">
        <div>
          <Card style={{ border: "none", cursor: "pointer" }}>
            <Card.Img
              variant="top"
              src={`https://picsum.photos/175?random=${idx}`}
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
