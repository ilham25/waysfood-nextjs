import { Container, Col, Row, Card } from "react-bootstrap";

const PopularCard = () => {
  return (
    <>
      <Col sm={3}>
        <Card style={{ border: "none", cursor: "pointer" }}>
          <Card.Body className="py-3">
            <Row>
              <Col sm={3} className="text-center">
                <img
                  src="/assets/img/burger-king.png"
                  height="64"
                  width="64"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col sm={9} className="my-auto text-center pl-4">
                <h3 className="heading font-weight-bold my-0">Burger King</h3>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default PopularCard;
