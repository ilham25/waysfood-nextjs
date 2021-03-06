import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

// GraphQL Query or Mutation
import { ALL_USERS, ALL_PRODUCTS } from "../utils/graphql/queries";

import HeroSection from "../components/static/HeroSection";
import PopularCard from "../components/reusable/PopularCard";
import RestaurantCard from "../components/reusable/RestaurantCard";
import LoginModal from "../components/static/LoginModal";
import RegisterModal from "../components/static/RegisterModal";

export default function Home() {
  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = () => {
    setAlert(
      <SweetAlert
        warning
        confirmBtnText="Close"
        confirmBtnBsStyle="danger"
        title="Your cart is not empty!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
      >
        Please empty your cart before changing restaurant
      </SweetAlert>
    );
  };

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: usersRefetch,
  } = useQuery(ALL_USERS);

  const partners = usersData?.users?.filter((item) => item.role === "PARTNER");

  console.log("pt", partners);

  return (
    <>
      <HeroSection />
      {usersLoading ? (
        <h1>loading</h1>
      ) : (
        <Container className="my-5 bg-grey">
          <Row className="mb-4">
            <Col sm={12}>
              <h2 className="heading font-weight-bold">Popular Restaurant</h2>
            </Col>
          </Row>
          <Row>
            {console.log(partners)}
            {partners?.map((partner, idx) => (
              <PopularCard
                key={idx}
                data={partner}
                idx={idx}
                showAlert={showAlert}
              />
            ))}
          </Row>
          <Row className="mt-5 mb-4">
            <Col sm={12}>
              <h2 className="heading font-weight-bold">Restaurant Near You</h2>
            </Col>
          </Row>
          <Row>
            {partners?.map((partner, idx) => (
              <RestaurantCard
                key={idx}
                data={partner}
                idx={idx}
                showAlert={showAlert}
              />
            ))}
          </Row>
        </Container>
      )}
      <LoginModal />
      <RegisterModal />
      {alert}
    </>
  );
}
