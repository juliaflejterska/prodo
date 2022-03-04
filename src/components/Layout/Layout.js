import { Fragment } from "react";
import Footer from "./Footer";

import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
