import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { motion } from "framer-motion";

import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { CartContext } from "../contexts/cartContext";
import { UserContext } from "../contexts/userContext";

// GraphQL Query and Mutation
import { INSERT_TRANSACTION, INSERT_ORDERS } from "../utils/graphql/mutations";

import CartOrder from "../components/reusable/CartOrder";

import { pageInit } from "../utils/animVariants";

const emptyIllust = "/assets/svg/cart_empty.svg";

const Cart = () => {
  const router = useRouter();
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [delivery, setDelivery] = useState(10000);
  const [total, setTotal] = useState(0);

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
    router.push("/profile");
    cartDispatch({
      type: "EMPTY_CART",
    });
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        success
        title="Order Success!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
      >
        Your order is being processed
      </SweetAlert>
    );
  };

  const [insertTransaction, { error: errTrans }] = useMutation(
    INSERT_TRANSACTION
  );
  const [insertOrders, { error: errOrders }] = useMutation(INSERT_ORDERS);

  const handleOrder = async () => {
    try {
      const { data: transData } = await insertTransaction({
        variables: { partnerId: cartState.currentRestaurant.id },
      });
      const products = [
        ...cartState.carts.map((cart) => ({
          productId: cart.id,
          transactionId: transData.createTransaction.id,
          qty: cart.qty,
        })),
      ];
      const { data: ordersData } = await insertOrders({
        variables: { inputs: products },
      });
      ordersData && showAlert();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let tmpQty = 0;
    let tmpPrice = 0;

    cartState.carts.map((cart) => {
      tmpQty = tmpQty + cart.qty;
      tmpPrice = tmpPrice + cart.price * cart.qty;
    });

    setQuantity(tmpQty);
    setPrice(tmpPrice);
    setTotal(tmpPrice + delivery);
  }, [cartState.carts]);

  useEffect(() => {
    !userState.isLogin && router.push("/");
  }, []);

  return (
    <>
      {cartState.carts.length == 0 ? (
        <>
          <Container
            as={motion.div}
            variants={pageInit}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <img src={emptyIllust} alt="illustration" height="450" />
            <h2 className="text-secondary font-weight-normal">
              Look's like your cart is empty
            </h2>
            <Button variant="brown mt-3 py-1" onClick={() => router.push("/")}>
              Back to home
            </Button>
          </Container>
        </>
      ) : (
        <motion.div
          variants={pageInit}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-grey py-5 mt-4"
        >
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
                      Rp. {price.toLocaleString()}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} lg={6}>
                    <p>Qty</p>
                  </Col>
                  <Col xs={6} lg={6}>
                    <p className="text-right">{quantity}</p>
                  </Col>
                </Row>
                <Row className="pb-0">
                  <Col xs={6} lg={6}>
                    <p className="mb-0">Ongkir</p>
                  </Col>
                  <Col xs={6} lg={6}>
                    <p className="text-right text-danger mb-0">
                      Rp. {delivery.toLocaleString()}
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
                      Rp. {total.toLocaleString()}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-5 justify-content-end">
                  <Col sm={8} className="text-right mt-5">
                    <Button
                      variant="brown"
                      className="w-100"
                      onClick={handleOrder}
                    >
                      Order
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </motion.div>
      )}
      {alert}
    </>
  );
};

export default Cart;
