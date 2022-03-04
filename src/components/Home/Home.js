import Quotes from "./Quotes";
import classes from "./Home.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <section>
      <div className={classes.main}>
        <div className={classes.container}>
          <img
            className={classes.img}
            src="https://images.unsplash.com/photo-1580637250481-b78db3e6f84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
          ></img>
          <div className={classes.text}>
            {!authCtx.isLoggedIn && (
              <motion.h1
                initial={{ scale: 100 }}
                animate={{ scale: 1.3 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1,
                }}
                className={classes.title}
              >
                PRODO
              </motion.h1>
            )}
            {authCtx.isLoggedIn && (
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1.3 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1.5,
                }}
                className={classes.title}
              >
                PRODO
              </motion.h1>
            )}

            {!authCtx.isLoggedIn && (
              <>
                <div className={classes.description}>
                  <span>
                    track your productivity like a <b>pro</b>
                  </span>
                </div>

                <Link to="/auth">
                  <button className={classes.btn}>
                    <span className={classes.span}>LOGIN / SIGN UP</span>
                  </button>
                </Link>
              </>
            )}
            {authCtx.isLoggedIn && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1,
                }}
              >
                <Quotes />
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.main2}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, stiffness: 260 }}
          className={classes.container2}
        >
          <img
            className={classes.img2}
            src="https://images.unsplash.com/photo-1641386337567-c824f91bea87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80"
          ></img>
          <div className={classes.text2}>
            {authCtx.isLoggedIn && (
              <Link to="/calendar">
                <button className={classes.btn}>
                  <span className={classes.span}>CALENDAR</span>
                </button>
              </Link>
            )}
            {!authCtx.isLoggedIn && (
              <Link to="/auth">
                <button className={classes.btn}>
                  <span className={classes.span}>CALENDAR</span>
                </button>
              </Link>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, stiffness: 260 }}
          className={classes.container2}
        >
          <img
            className={classes.img2}
            src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          ></img>
          <div className={classes.text2}>
            {authCtx.isLoggedIn && (
              <Link to="/expenses">
                <button className={classes.btn}>
                  <span className={classes.span}>EXPENSES TRACKER</span>
                </button>
              </Link>
            )}
            {!authCtx.isLoggedIn && (
              <Link to="/auth">
                <button className={classes.btn}>
                  <span className={classes.span}>EXPENSES TRACKER</span>
                </button>
              </Link>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, stiffness: 260 }}
          className={classes.container2}
        >
          <img
            className={classes.img2}
            src="https://images.unsplash.com/photo-1591258370814-01609b341790?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          ></img>
          <div className={classes.text2}>
            {authCtx.isLoggedIn && (
              <Link to="/goals">
                <button className={classes.btn}>
                  <span className={classes.span}>GOALS TRACKER</span>
                </button>
              </Link>
            )}
            {!authCtx.isLoggedIn && (
              <Link to="/auth">
                <button className={classes.btn}>
                  <span className={classes.span}>GOALS TRACKER</span>
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
