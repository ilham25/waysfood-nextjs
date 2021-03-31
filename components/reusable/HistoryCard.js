import { useContext } from "react";
import { Col, Card, Row, Button } from "react-bootstrap";

// State Management
import { UserContext } from "../../contexts/userContext";

// Utility
import { handleDate } from "../../utils/handleDate";

// Assets
const brandLogo = "/assets/svg/brand.svg";

function HistoryCard({ data }) {
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { id, status, partner, createdBy, createdAt } = data;
  const fullName =
    userState.loggedUser.role === "USER"
      ? `${partner.firstName} ${partner.lastName}`
      : `${createdBy.firstName} ${createdBy.lastName}`;
  return (
    <Col xs={12} md={12} className="mb-4">
      <Card style={{ border: "none" }}>
        <Card.Body>
          <Row>
            <Col xs={6} md={6}>
              <Row>
                <Col>
                  <p className="heading font-weight-bold mb-1 h5">{fullName}</p>
                  {handleDate(createdAt)}
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
                {status}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
