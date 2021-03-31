import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

// State Management
import { UserContext } from "../contexts/userContext";

// GraphQL Query and Mutation
import { INSERT_PRODUCT } from "../utils/graphql/mutations";
import { ALL_PRODUCTS } from "../utils/graphql/queries";

// Components
import CustomFormInput from "../components/static/CustomFormInput";
import CustomFormFile from "../components/static/CustomFormFile";
import MenuCardAdvanced from "../components/reusable/MenuCardAdvanced";

const Add = () => {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const [editId, setEditId] = useState("s");

  const [insertProduct, { error }] = useMutation(INSERT_PRODUCT);

  const { loading, error: productError, data, refetch } = useQuery(
    ALL_PRODUCTS
  );
  console.log("data", data);

  const products = data?.products?.filter(
    (item) => item.createdBy.id === userState?.loggedUser?.id
  );

  const addProduct = async (formData) => {
    try {
      const { data } = await insertProduct({
        variables: formData,
      });
      data && router.push("/profile");
    } catch (error) {
      console.log("prod", error);
    }
  };

  const updateProduct = async () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      price: parseInt(e.target.price.value),
      image: e.target.image.value,
    };
    editId ? updateProduct(formData) : addProduct(formData);
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
                  <Col xs={12}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown="true"
                        type="text"
                        placeholder="Title"
                        name="title"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown="true"
                        type="text"
                        placeholder="Image URL"
                        name="image"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} lg={12}>
                    <Form.Group>
                      <CustomFormInput
                        isBrown="true"
                        type="number"
                        placeholder="Price"
                        name="price"
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
          <Row className="my-4">
            <Col xs={12}>
              <h1 className="heading font-weight-bold">Product List</h1>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <h2>Loading...</h2>
            ) : (
              products?.map((product, idx) => (
                <MenuCardAdvanced key={idx} data={product} refetch={refetch} />
              ))
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Add;
