import { useContext } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

// State Management
import { CartContext } from "../contexts/cartContext";

import CartOrder from "../components/reusable/CartOrder";

const Cart = () => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  return (
    <>
      <div className="bg-grey py-5 mt-4">
        <Container>
          <Row className="mb-4">
            <Col sm={12}>
              <h1 className="heading font-weight-bold">Restaurant</h1>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
              <h5 className="text-brown font-weight-normal">
                Review your order
              </h5>
            </Col>
          </Row>
          <Row>
            <Col sm={12} lg={7}>
              <hr className="divider" />
              {cartState.carts.map((cart, idx) => (
                <CartOrder key={idx} data={cart} idx={idx} />
              ))}
            </Col>
            <Col lg={5}>
              <hr className="divider d-none d-lg-block" />
              <Row>
                <Col xs={6} lg={6}>
                  <p>Subtotal</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger">
                    {/* Rp. {price.toLocaleString()} */}
                    Rp. 10.000
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={6} lg={6}>
                  <p>Qty</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right">
                    {/* {quantity} */}
                    10
                  </p>
                </Col>
              </Row>
              <Row className="pb-0">
                <Col xs={6} lg={6}>
                  <p className="mb-0">Ongkir</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger mb-0">
                    {/* Rp. {delivery.toLocaleString()} */}
                    Rp. 15.000
                  </p>
                </Col>
              </Row>
              <hr className="divider" />
              <Row className="pb-0">
                <Col xs={6} lg={6}>
                  <p className="mb-0 text-danger font-weight-bold">Total</p>
                </Col>
                <Col xs={6} lg={6}>
                  <p className="text-right text-danger font-weight-bold mb-0">
                    {/* Rp. {total.toLocaleString()} */}
                    Rp. 20.000
                  </p>
                </Col>
              </Row>
              <Row className="mt-5 justify-content-end">
                <Col sm={8} className="text-right mt-5">
                  <Button variant="brown" className="w-100 ">
                    Order
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Cart;
