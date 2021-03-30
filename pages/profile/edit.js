import { Container, Col, Row, Form, Button } from "react-bootstrap";

import CustomFormInput from "../../components/static/CustomFormInput";
import CustomFormFile from "../../components/static/CustomFormFile";

const Edit = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // history.push("/profile");
  };
  return (
    <>
      <div className="bg-grey py-5 mt-4">
        <Container>
          <Row className="mb-4">
            <Col xs={12}>
              <h1 className="heading font-weight-bold">
                Edit Profile {0 == 1 && "Partner"}
              </h1>
            </Col>
          </Row>
          <Row>
            <Col className="">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} lg={9}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown={true}
                        type="text"
                        placeholder="Full Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} lg={3}>
                    <Form.Group controlId="inputFile">
                      <CustomFormFile
                        placeholder="Attach Image"
                        name="inputFile"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} lg={12}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown={true}
                        type="email"
                        placeholder="Email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} lg={12}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown={true}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col lg={12} className="text-right">
                    <Button variant="brown" className="w-25" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Edit;
