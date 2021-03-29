import { Container, Col, Row, Card, Button } from "react-bootstrap";

const RestaurantCard = () => {
  return (
    <>
      <Col sm={3}>
        <Card style={{ border: "none", cursor: "pointer" }}>
          <Card.Img
            variant="top"
            height="200"
            src="/assets/img/menu/geprek2.png"
            className="p-3"
            style={{ objectFit: "cover" }}
          />
          <Card.Body className="px-3 pt-0">
            <Card.Title className="heading font-weight-bolder">
              Card Title
            </Card.Title>
            <Card.Text className="heading">Makanan</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default RestaurantCard;
