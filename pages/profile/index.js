import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { UserContext } from "../../contexts/userContext";

import { Container, Row, Col, Button } from "react-bootstrap";
import HistoryCard from "../../components/reusable/HistoryCard";

// GraphQL Query and Mutation
import { ALL_TRANSACTIONS, ALL_ORDERS } from "../../utils/graphql/queries";
import { UPDATE_TRANSACTION } from "../../utils/graphql/mutations";

import { pageInit } from "../../utils/animVariants";

// Assets
const imgProfileBig = "/assets/img/profile-big.png";
const bensu = "/assets/img/restaurant/bensu.png";

const Profile = () => {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    image,
    role,
  } = userState.loggedUser;

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = (title, message, isVerified, id) => {
    setAlert(
      <SweetAlert
        info
        showCancel={isVerified}
        confirmBtnText="Confirm"
        confirmBtnBsStyle="success"
        title={title}
        onConfirm={() => {
          hideAlert();
          isVerified && handleApprove(id, "success");
        }}
        onCancel={() => hideAlert()}
        focusCancelBtn
      >
        {message}
      </SweetAlert>
    );
  };

  const {
    loading: transLoading,
    error: transError,
    data: transData,
    refetch: transRefetch,
  } = useQuery(ALL_TRANSACTIONS);

  const transFiltered = transData?.transactions?.filter((item) => {
    if (role === "PARTNER") return item.partner.id === id;
    return item.createdBy.id === id;
  });

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

  const handleApprove = async (id, status) => {
    try {
      const { data } = await updateTransaction({ variables: { id, status } });
      console.log("dt", data);
      transRefetch();
    } catch (error) {
      console.log("inc", error);
    }
  };

  useEffect(() => {
    !userState.isLogin && router.push("/");
    transRefetch();
  }, []);

  console.log(transData);
  console.log(transFiltered);
  return (
    <>
      <motion.div
        variants={pageInit}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-grey py-5 mt-4"
      >
        <Container>
          <Row className="mb-4">
            <Col xs={12} md={12} lg={7}>
              <Row className="mb-4">
                <Col>
                  <h1 className="heading font-weight-bold">My Profile</h1>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={12} md={4}>
                  <img
                    src={image ? image : imgProfileBig}
                    alt="profile photo"
                    className="w-100 mb-4 mb-sm-0"
                    height="222"
                    style={{ borderRadius: "5px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Full Name</h5>
                    </Col>
                    <Col md={12}>
                      <p>
                        {firstName} {lastName}
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Email</h5>
                    </Col>
                    <Col md={12}>
                      <p>{email}</p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Phone</h5>
                    </Col>
                    <Col md={12}>
                      <p>{phone}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mb-4 mb-0">
                <Col md={4}>
                  <Link href="/profile/edit">
                    <Button variant="brown" className="w-100" size="lg">
                      Edit Profile
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12} lg={5}>
              <Row className="mb-4">
                <Col>
                  <h1 className="heading font-weight-bold">
                    History {0 ? "Order" : "Transaction"}
                  </h1>
                </Col>
              </Row>
              <Row>
                {transLoading ? (
                  <h3>Loading...</h3>
                ) : (
                  transFiltered?.map((trans, idx) => (
                    <HistoryCard key={idx} data={trans} showAlert={showAlert} />
                  ))
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </motion.div>
      {alert}
    </>
  );
};

export default Profile;
