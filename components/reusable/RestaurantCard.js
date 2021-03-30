import { useRouter } from "next/router";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

const RestaurantCard = ({ data, idx }) => {
  const router = useRouter();
  const { id, firstName, lastName } = data;
  return (
    <>
      <Col sm={3}>
        <Card
          style={{ border: "none", cursor: "pointer" }}
          onClick={() => router.push(`/detail/${id}`)}
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
