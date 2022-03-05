import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);
