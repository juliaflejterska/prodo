import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { motion } from "framer-motion";
import classes from "./Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  //handling logout (setting token in auth context to "")
  const logoutHandler = () => {
    authCtx.logout();
  };

  const hamburger = <FontAwesomeIcon icon={faBars} />;
  const closeHamburger = <FontAwesomeIcon icon={faTimes} />;

  const [isClicked, setIsClicked] = useState(false);

  return (
    <nav>
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 25,
          duration: 1,
        }}
      >
        <NavLink className={classes.logo} to="/">
          PRODO
        </NavLink>
      </motion.div>

      <div
        className={classes.hamburger}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
      >
        {isClicked ? closeHamburger : hamburger}
      </div>

      <ul className={isClicked ? classes.links : classes.closed}>
        {!isLoggedIn && (
          <li
            onClick={() => {
              setIsClicked((isClicked) => (isClicked = false));
            }}
          >
            <NavLink className={classes.link} to="/auth">
              Login
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li
            onClick={() => {
              setIsClicked((isClicked) => (isClicked = false));
            }}
          >
            <NavLink className={classes.link} to="/calendar">
              Calendar
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li
            onClick={() => {
              setIsClicked((isClicked) => (isClicked = false));
              window.location.reload();
            }}
          >
            <NavLink className={classes.link} to="/expenses">
              Expenses
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li
            onClick={() => {
              setIsClicked((isClicked) => (isClicked = false));
            }}
          >
            <NavLink className={classes.link} to="/goals">
              Goals
            </NavLink>
          </li>
        )}

        {isLoggedIn && (
          <li
            onClick={() => {
              setIsClicked((isClicked) => (isClicked = false));
            }}
          >
            <button className={classes.btn} onClick={logoutHandler}>
              <span className={classes.span}>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
