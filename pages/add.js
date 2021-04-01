import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import SweetAlert from "react-bootstrap-sweetalert";

// State Management
import { UserContext } from "../contexts/userContext";

// GraphQL Query and Mutation
import { INSERT_PRODUCT, UPDATE_PRODUCT } from "../utils/graphql/mutations";
import { ALL_PRODUCTS, EACH_PRODUCT } from "../utils/graphql/queries";

// Components
import CustomFormInput from "../components/static/CustomFormInput";
import CustomFormFile from "../components/static/CustomFormFile";
import MenuCardAdvanced from "../components/reusable/MenuCardAdvanced";

import { pageInit } from "../utils/animVariants";

const Add = () => {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);

  const [editId, setEditId] = useState("");
  const [form, setForm] = useState({
    title: "",
    price: 0,
    image: "",
  });
  const { title, price, image } = form;

  const [alert, setAlert] = useState(null);
  const hideAlert = () => {
    setAlert(null);
  };
  const showAlert = (isDanger) => {
    setAlert(
      isDanger ? (
        <SweetAlert
          danger
          showCancel
          confirmBtnText="Confirm"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          focusCancelBtn
        >
          Your product will be deleted
        </SweetAlert>
      ) : (
        <SweetAlert
          success
          confirmBtnText="Confirm"
          confirmBtnBsStyle="success"
          title="Success!"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          focusCancelBtn
        >
          Your product has been updated
        </SweetAlert>
      )
    );
  };

  const [insertProduct, { error: insErr }] = useMutation(INSERT_PRODUCT);
  const [updateProduct, { error: updErr }] = useMutation(UPDATE_PRODUCT);

  const { loading, data, refetch } = useQuery(ALL_PRODUCTS);

  const products = data?.products?.filter(
    (item) => item.createdBy.id === userState?.loggedUser?.id
  );

  const addProduct = async () => {
    try {
      console.log("lel");
      const { data } = await insertProduct({
        variables: { ...form, price: parseInt(form.price) },
      });
      data && refetch();
      data && showAlert();
      setForm({
        title: "",
        price: 0,
        image: "",
      });
    } catch (error) {
      console.log("prod", error);
    }
  };

  const editProduct = async () => {
    try {
      const { data } = await updateProduct({
        variables: { ...form, price: parseInt(form.price), id: editId },
      });
      data && refetch();
      data && showAlert();
      setEditId("");
      setForm({
        title: "",
        price: 0,
        image: "",
      });
    } catch (error) {
      console.log("ed", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editId ? editProduct() : addProduct();
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    !userState.isLogin && router.push("/");
  }, []);

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
            <Col xs={12}>
              <h1 className="heading font-weight-bold">
                {editId ? "Edit" : "Add"} Product
              </h1>
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
                        value={title}
                        onChange={(e) => onChange(e)}
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
                        value={image}
                        onChange={(e) => onChange(e)}
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
                        value={price}
                        onChange={(e) => onChange(e)}
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
                <MenuCardAdvanced
                  key={idx}
                  data={product}
                  refetch={refetch}
                  setEditId={setEditId}
                  setForm={setForm}
                  showAlert={showAlert}
                />
              ))
            )}
          </Row>
        </Container>
      </motion.div>
      {alert}
    </>
  );
};

export default Add;
