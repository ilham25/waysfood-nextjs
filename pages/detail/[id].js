import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

// State Management
import { CartContext } from "../../contexts/cartContext";

// GraphQL Query and Mutation
import client from "../../utils/apollo-client";
import { ALL_PRODUCTS, ALL_USERS } from "../../utils/graphql/queries";

import MenuCard from "../../components/reusable/MenuCard";

import { pageInit } from "../../utils/animVariants";

export const getStaticPaths = async () => {
  // const { loading, error, data, refetch } = useQuery(ALL_USERS);
  const { data } = await client.query({
    query: ALL_USERS,
  });

  console.log(data);

  const partners = data?.users?.filter((item) => item.role === "PARTNER");

  const paths = partners?.map((partner) => ({
    params: { id: partner?.id },
  }));

  console.log("paths", paths, partners);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  // console.log("njir", id);

  const { data } = await client.query({ query: ALL_PRODUCTS });
  console.log("data", data);

  const products = data?.products?.filter((item) => item.createdBy.id === id);

  return {
    props: {
      products,
    },
  };
};

const Detail = ({ products }) => {
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
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
          <Row>
            <Col xs={12}>
              <h1 className="heading font-weight-bold mb-4">
                {cartState?.currentRestaurant?.fullName}, Menus
              </h1>
            </Col>
          </Row>
          <Row>
            {products?.map((product, idx) => (
              <MenuCard key={idx} data={product} idx={idx} />
            ))}
          </Row>
        </Container>
      </motion.div>
    </>
  );
};

export default Detail;
