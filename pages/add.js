import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

// Components
import CustomFormInput from "../components/static/CustomFormInput";
import CustomFormFile from "../components/static/CustomFormFile";

const Add = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handleShow();
  };
  return (
    <>
      <div className="bg-grey py-5 mt-4">
        <Container>
          <Row className="mb-4">
            <Col xs={12}>
              <h1 className="heading font-weight-bold">Add Product</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col xs={12} lg={9}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown="true"
                        type="text"
                        placeholder="Title"
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
                        isBrown="true"
                        type="text"
                        placeholder="Price"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col xs={12} lg={12} className="text-right">
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

export default Add;
