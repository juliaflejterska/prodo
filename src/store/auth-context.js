import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,

  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  //checking if token is in local storage
  const localStorageToken = localStorage.getItem("token");

  const [token, setToken] = useState(localStorageToken);

  // if token is an empty string -> false
  // if token isn't empty string -> true
  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);

    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    setToken(token);

    //saving token in local storage
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
