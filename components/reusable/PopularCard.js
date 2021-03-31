import { useRouter } from "next/router";
import { useContext } from "react";

import { Container, Col, Row, Card } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";

const PopularCard = ({ data, idx }) => {
  const router = useRouter();
  const { state: cartContext, dispatch: cartDispatch } = useContext(
    CartContext
  );

  const { id, firstName, lastName, image } = data;

  const handleClick = () => {
    cartDispatch({
      type: "CURRENT_RESTAURANT",
      payload: {
        id,
        fullName: `${firstName} ${lastName}`,
      },
    });
    router.push(`/detail/${id}`);
  };
  return (
    <>
      <Col sm={3}>
        <Card
          style={{ border: "none", cursor: "pointer" }}
          onClick={handleClick}
        >
          <Card.Body className="py-3">
            <Row>
              <Col sm={3} className="text-center">
                <img
                  src={image}
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
