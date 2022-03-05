import AddTransaction from "./AddTransaction";
import Balance from "./Balance";
import Transactions from "./Transactions";
import { ExpenseContextProvider } from "../../store/expense-context";
import { useState } from "react";
import classes from "./ExpenseTracker.module.css";
import TransactionsCharts from "./TransactionsCharts";
import { motion } from "framer-motion";

const ExpenseTracker = () => {
  const [showAdd, setShowAdd] = useState(false);

  const showAddHandler = () => {
    setShowAdd(true);
  };

  return (
    <ExpenseContextProvider>
      <section>
        <div className={classes.empty}></div>
        <div className={classes.main}>
          <div className={classes.container}>
            <img
              className={classes.img}
              src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
              alt="woman with a laptop and a credit card"
            ></img>
            {!showAdd && (
              <div className={classes.text}>
                <motion.h1
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 160,
                    damping: 25,
                    duration: 1,
                  }}
                >
                  EXPENSE TRACKER
                </motion.h1>
                <button className={classes.btn} onClick={showAddHandler}>
                  <span className={classes.span}>ADD A TRANSACTION</span>
                </button>
              </div>
            )}
          </div>

          {showAdd && (
            <div className={classes.add}>
              <AddTransaction />
            </div>
          )}
        </div>

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, stiffness: 260 }}
        >
          <Balance />
        </motion.div>

        <div className={classes.history}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, stiffness: 260 }}
          >
            <Transactions />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, stiffness: 260 }}
          >
            <TransactionsCharts />
          </motion.div>
        </div>
      </section>
    </ExpenseContextProvider>
  );
};

export default ExpenseTracker;
