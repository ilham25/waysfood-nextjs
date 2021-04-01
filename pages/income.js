import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";

import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Modal,
  Table,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

// State Management
import { UserContext } from "../contexts/userContext";
import { CartContext } from "../contexts/cartContext";
import { ALL_TRANSACTIONS } from "../utils/graphql/queries";
import { UPDATE_TRANSACTION } from "../utils/graphql/mutations";

// Assets
const actionSuccess = "/assets/svg/action-success.svg";
const actionCancel = "/assets/svg/action-cancel.svg";

function Income() {
  const router = useRouter();
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const { id } = userState?.loggedUser;

  const { loading, error, data, refetch } = useQuery(ALL_TRANSACTIONS);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION);

  const transactions = data?.transactions?.filter(
    (trans) => trans.partner.id === id
  );

  const handleApprove = async (id, status) => {
    try {
      const { data } = await updateTransaction({ variables: { id, status } });
      console.log("dt", data);
      refetch();
    } catch (error) {
      console.log("inc", error);
    }
  };

  const handleAction = (id, status) => {
    switch (status) {
      case "cancel":
        return (
          <>
            <td className="text-center">
              <p className="text-danger">Cancel</p>
            </td>
            <td className="text-center">
              <img src={actionCancel} height="20" alt="cancel action" />
            </td>
          </>
        );
        break;
      case "waiting":
        return (
          <>
            <td className="text-center">
              <p className="text-warning">Waiting Approve</p>
            </td>
            <td className="text-center">
              <div>
                <Button
                  onClick={() => handleApprove(id, "cancel")}
                  size="sm"
                  variant="danger"
                  className="mr-0 mr-lg-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleApprove(id, "otw")}
                  size="sm"
                  variant="success"
                >
                  Approve
                </Button>
              </div>
            </td>
          </>
        );
        break;
      case "otw":
        return (
          <>
            <td className="text-center">
              <p className="text-info">On The Way</p>
            </td>
            <td className="text-center">
              <img src={actionSuccess} height="20" alt="success action" />
            </td>
          </>
        );
        break;
      case "success":
        return (
          <>
            <td className="text-center">
              <p className="text-success">Success</p>;
            </td>
            <td className="text-center">
              <img src={actionSuccess} height="20" alt="success action" />
            </td>
          </>
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    userState.loggedUser.role !== "PARTNER" && router.push("/");
  }, []);

  return (
    <div className="bg-grey py-5 mt-4">
      <Container>
        <Row className="mb-4">
          <Col xs={12}>
            <h1 className="heading font-weight-bold">Income Transaction</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="table-responsive-xs">
            <div className="table-responsive">
              <Table
                bordered
                style={{ backgroundColor: "white", borderColor: "#828282" }}
                className="overflow-auto"
              >
                <thead style={{ backgroundColor: "#E5E5E5" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <h2>Loading...</h2>
                  ) : (
                    transactions?.map((trans, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          {trans?.createdBy?.firstName}{" "}
                          {trans?.createdBy?.lastName}
                        </td>

                        {handleAction(trans?.id, trans?.status)}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Income;
