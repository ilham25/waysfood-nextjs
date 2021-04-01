import { useRouter } from "next/router";
import { useContext } from "react";
import { Col, Card, Row, Button } from "react-bootstrap";

// State Management
import { UserContext } from "../../contexts/userContext";

// Utility
import { handleDate } from "../../utils/handleDate";

// Assets
const brandLogo = "/assets/svg/brand.svg";

function HistoryCard({ data, showAlert }) {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { id, status, partner, createdBy, createdAt } = data;
  const fullName =
    userState.loggedUser.role === "USER"
      ? `${partner.firstName} ${partner.lastName}`
      : `${createdBy.firstName} ${createdBy.lastName}`;

  const handleStatus = () => {
    switch (status) {
      case "cancel":
        return (
          <div
            className="text-danger w-100 text-center"
            style={{ backgroundColor: "#FFE8ED", borderRadius: "5px" }}
          >
            Cancel
          </div>
        );
      case "waiting":
        return (
          <div
            className="w-100 text-center"
            style={{
              backgroundColor: "#FFF2D3",
              borderRadius: "5px",
              color: "#FFB400",
            }}
          >
            Waiting Approve
          </div>
        );

      case "otw":
        return (
          <div
            className="w-100 text-center"
            style={{
              backgroundColor: "#E7F6FF",
              borderRadius: "5px",
              color: "#20AFFF",
            }}
          >
            On The Way
          </div>
        );
      case "success":
        return (
          <div
            className="text-green w-100 text-center"
            style={{ backgroundColor: "#E7fff2", borderRadius: "5px" }}
          >
            Finished
          </div>
        );
      default:
        break;
    }
  };
  const handleClick = () => {
    if (userState.loggedUser.role === "PARTNER") {
      router.push("/income");
    } else {
      switch (status) {
        case "waiting":
          showAlert("Waiting", "Waiting for your order approval");
          break;

        case "success":
          showAlert("Finished", "Your order is finished");

          break;
        case "cancel":
          showAlert("Cancel", "Your order has been cancelled");

          break;
        case "otw":
          showAlert(
            "Finish Order",
            "Are you sure want to finish your order?",
            true,
            id
          );

          break;
        default:
          break;
      }
    }
  };
  return (
    <Col xs={12} md={12} className="mb-4">
      <Card style={{ border: "none", cursor: "pointer" }} onClick={handleClick}>
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
              {handleStatus()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HistoryCard;
