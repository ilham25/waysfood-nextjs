import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

import { Col, Card, Button } from "react-bootstrap";

// State Management
import { CartContext } from "../../contexts/cartContext";
import { DELETE_PRODUCT } from "../../utils/graphql/mutations";

export default function MenuCardAdvanced({
  data,
  refetch,
  setEditId,
  setForm,
}) {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT);

  const handleDelete = async () => {
    try {
      const { data: respData } = await deleteProduct({
        variables: { id: data.id },
      });
      console.log(respData);
      respData && refetch();
    } catch (error) {
      console.log("prodDel", error);
    }
  };
  const handleEdit = async () => {
    setEditId(data.id);
    setForm({
      title: data?.title,
      price: data?.price,
      image: data?.image,
    });
  };
  return (
    <>
      <Col xs={12} md={4} lg={3} className="mb-4">
        <div>
          <Card style={{ border: "none", cursor: "pointer" }}>
            <Card.Img
              variant="top"
              src={data?.image}
              height="175"
              className="p-3"
              style={{ objectFit: "cover" }}
            />
            <Card.Body className="px-3 pt-0">
              <Card.Title
                className="heading font-weight-bolder mb-0"
                style={{ height: "40px" }}
              >
                {data?.title}
              </Card.Title>
              <Card.Text className="heading text-danger">
                Rp. {data?.price.toLocaleString()}
              </Card.Text>
              <Col sm={12}>
                <Button
                  variant="success"
                  size="sm"
                  style={{ width: "90px" }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  style={{ width: "90px" }}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Col>
            </Card.Body>
          </Card>
        </div>
      </Col>
    </>
  );
}
