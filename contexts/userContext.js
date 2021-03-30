import { createContext, useReducer, useEffect } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  users: [],
  loggedUser: null,
  orderLocation: { lng: 106.735157, lat: -6.301431 },
  orderPlace: "",
  loading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "EDIT_SUCCESS":
    case "LOGIN_SUCCESS":
    case "LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isLogin: true,
        loggedUser: {
          id: payload.user.id,
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          email: payload.user.email,
          image: payload.user.image,
          role: payload.user.role,
          phone: payload.user.phoneNumber,
        },
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        loggedUser: null,
        loading: false,
      };
    case "ORDER_LOC":
      return {
        ...state,
        orderLocation: payload,
      };
    case "ORDER_PLACE":
      return {
        ...state,
        orderPlace: payload,
      };

    default:
      throw new Error("Out of context");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
