import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,

  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const localStorageToken = localStorage.getItem("token");

  const [token, setToken] = useState(localStorageToken);

  const isLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);

    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    setToken(token);

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
