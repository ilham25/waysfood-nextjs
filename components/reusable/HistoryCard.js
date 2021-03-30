import { Col, Card, Row, Button } from "react-bootstrap";

// Assets
const brandLogo = "/assets/svg/brand.svg";

function HistoryCard() {
  return (
    <Col xs={12} md={12} className="mb-4">
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            <Col xs={6} md={6}>
              <Row>
                <Col>
                  <p className="heading font-weight-bold mb-1 h5">
                    {0 ? "Nama User" : "Restaurant"}
                  </p>
                  <small className="">
                    <span className="font-weight-bold">Tuesday,</span> 30 March
                    2021
                  </small>
                </Col>
              </Row>
            </Col>
            <Col xs={6} md={6} className="text-right">
              <img src={brandLogo} alt="brandLogo" height="40" />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col xs={6} md={6}>
              <p className="font-weight-bold" style={{ color: "#974A4A" }}>
                {/* Total : Rp. {total.toLocaleString()} */}
                Total : Rp. 15.000
              </p>
            </Col>
            <Col xs={6} md={6} className=" pl-5 pl-sm-5 ">
              <div
                className="text-green w-100 text-center"
                style={{ backgroundColor: "#E7fff2", borderRadius: "5px" }}
              >
                Finished
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
