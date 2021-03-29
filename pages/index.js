import { Container, Col, Row } from "react-bootstrap";
import HeroSection from "../components/static/HeroSection";
import PopularCard from "../components/reusable/PopularCard";
import RestaurantCard from "../components/reusable/RestaurantCard";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Container className="my-5 bg-grey">
        <Row className="mb-4">
          <Col sm={12}>
            <h2 className="heading font-weight-bold">Popular Restaurant</h2>
          </Col>
        </Row>
        <Row>
          <PopularCard />
        </Row>
        <Row className="mt-5 mb-4">
          <Col sm={12}>
            <h2 className="heading font-weight-bold">Restaurant Near You</h2>
          </Col>
        </Row>
        <Row>
          <RestaurantCard />
        </Row>
      </Container>
    </>
  );
}
