import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";

import { Dropdown } from "react-bootstrap";

// Assets
const iconProfile = "/assets/svg/profile.svg";
const iconAddProduct = "/assets/svg/addproduct.svg";
const iconLogout = "/assets/svg/logout.svg";
const iconCart = "/assets/svg/cart.svg";
const imgProfile = "/assets/img/profile.png";
const bensu = "/assets/img/restaurant/bensu.png";

const ProfileButton = () => {
  const router = useRouter();

  //   const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  //   const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);

  const handleLogout = () => {
    // cartDispatch({
    //   type: "EMPTY_CART",
    // });
    // userDispatch({
    //   type: "LOGOUT",
    // });
    // history.location.pathname !== "/" && history.push("/");
  };

  return (
    <>
      <Link href={0 == 1 ? "/income" : "/cart"}>
        <a>
          <div style={{ width: "40px", height: "40px", position: "relative" }}>
            {0 > 0 && (
              <div
                className="cart-badge"
                style={{
                  width: "15px",
                  height: "15px",
                  position: "absolute",
                  right: "0px",
                  top: "8px",
                  borderRadius: "10px",
                }}
                className="bg-danger d-flex align-item-center justify-content-center"
              >
                <small
                  style={{
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  10
                </small>
              </div>
            )}
            <img src={iconCart} alt="cart" width="40" />
          </div>
        </a>
      </Link>
      <Dropdown className="ml-2">
        <Dropdown.Toggle
          variant="warning"
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          <img
            src={0 == 1 ? bensu : imgProfile}
            alt="photo"
            width="64"
            height="64"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu
          style={{
            position: "absolute",
            left: 0 == 1 ? "-100px" : "-50px",
            fontSize: "1.2em",
          }}
        >
          <Link href="/profile">
            <Dropdown.Item as="a" href="/profile" className="py-2">
              <img src={iconProfile} alt="icon" width="30" className="mr-2" />{" "}
              Profile
            </Dropdown.Item>
          </Link>
          {0 == 1 && (
            <Link href="/add">
              <Dropdown.Item as="a" href="/add" className="py-2">
                <img
                  src={iconAddProduct}
                  alt="add product icon"
                  width="30"
                  className="mr-2"
                />{" "}
                Add Product
              </Dropdown.Item>
            </Link>
          )}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout} className="py-2">
            <img
              src={iconLogout}
              alt="logout icon"
              className="mr-2"
              width="30"
              style={{ objectFit: "cover" }}
            />{" "}
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProfileButton;
