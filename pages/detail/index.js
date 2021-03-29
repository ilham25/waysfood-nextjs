import { Container, Row, Col } from "react-bootstrap";
import MenuCard from "../../components/reusable/MenuCard";

const Detail = () => {
  return (
    <>
      <div className="bg-grey py-5 mt-4">
        <Container>
          <Row>
            <Col xs={12}>
              <h1 className="heading font-weight-bold mb-4">
                Restaurant, Menus
              </h1>
            </Col>
          </Row>
          <Row>
            <MenuCard />
            <MenuCard />
            <MenuCard />
            <MenuCard />
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Detail;
