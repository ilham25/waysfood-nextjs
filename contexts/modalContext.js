import { createContext, useReducer } from "react";

export const ModalContext = createContext();

const initialState = {
  loginModal: false,
  registerModal: false,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPEN_LOGIN":
      return {
        ...state,
        loginModal: true,
      };

    case "CLOSE_LOGIN":
      return {
        ...state,
        loginModal: false,
      };
    case "OPEN_REGISTER":
      return {
        ...state,
        registerModal: true,
      };

    case "CLOSE_REGISTER":
      return {
        ...state,
        registerModal: false,
      };

    default:
      throw new Error("Out of context");
  }
};
export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
