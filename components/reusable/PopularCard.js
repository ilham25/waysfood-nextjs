import { Container, Col, Row, Card } from "react-bootstrap";

const PopularCard = ({ data, idx }) => {
  const { firstName, lastName } = data;
  return (
    <>
      <Col sm={3}>
        <Card style={{ border: "none", cursor: "pointer" }}>
          <Card.Body className="py-3">
            <Row>
              <Col sm={3} className="text-center">
                <img
                  src={`https://picsum.photos/100?random=${idx}`}
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
