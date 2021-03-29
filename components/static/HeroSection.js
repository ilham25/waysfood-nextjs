import { Container, Col, Row } from "react-bootstrap";

// SVG
const pizza = "/assets/svg/pizza.svg";

export default function HeroSection() {
  return (
    <div className="py-5 bg-warning">
      <Container>
        <Row>
          <Col xs={12} lg={6} className="py-5">
            <h1 className="heading display-4 font-weight-bold">
              Are you Hungry ?
            </h1>
            <h1 className="heading display-4 font-weight-bold">
              Express Home Delivery
            </h1>
            <div className="bot-text mt-4 d-flex">
              <div
                className="line bg-dark mr-4 mt-3"
                style={{ width: "180px", height: "4px", borderRadius: "10px" }}
              ></div>
              <div style={{ width: "300px" }}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
                  aliquam maiores cumque possimus? Quae necessitatibus maxime
                  eveniet ducimus tempora. Blanditiis.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="text-center">
            <img src={pizza} alt="pizza" className="w-75 w-lg-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
