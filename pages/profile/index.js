import Link from "next/link";

import { Container, Row, Col, Button } from "react-bootstrap";
import HistoryCard from "../../components/reusable/HistoryCard";

// Assets
const imgProfileBig = "/assets/img/profile-big.png";
const bensu = "/assets/img/restaurant/bensu.png";

const Profile = () => {
  return (
    <>
      <div className="bg-grey py-5 mt-4">
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
                    src={0 ? bensu : imgProfileBig}
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
                        {/* {fullname} */}
                        Ilham Adiputra
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Email</h5>
                    </Col>
                    <Col md={12}>
                      <p>
                        {/* {email} */}
                        email@gmail.com
                      </p>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col md={12}>
                      <h5 className="text-brown">Phone</h5>
                    </Col>
                    <Col md={12}>
                      <p>
                        {/* {phone} */}
                        081237123945
                      </p>
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
                {/* {cartState.transactions.map((tran, index) =>
                  userState.loggedUser.userrole == 1
                    ? tran.restaurant.title ===
                        userState.loggedUser.fullname && (
                        <HistoryCard
                          key={index}
                          userrole={userrole}
                          data={tran}
                        />
                      )
                    : tran.user.fullname === userState.loggedUser.fullname && (
                        <HistoryCard
                          key={index}
                          userrole={userrole}
                          data={tran}
                        />
                      )
                )} */}
                <HistoryCard />
                <HistoryCard />
                <HistoryCard />
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
