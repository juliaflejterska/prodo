import { ExpenseContext } from "../../store/expense-context";
import { useContext } from "react";
import classes from "./Balance.module.css";

const Balance = () => {
  const { transactions } = useContext(ExpenseContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  return (
    <div className={classes.all}>
      <div>
        <h2>balance</h2>
        <h3>${total}</h3>
      </div>
      <div>
        <h2>income</h2>
        <h3 className={classes.incomeValue}>${income}</h3>
      </div>
      <div>
        <h2>expense</h2>
        <h3 className={classes.expenseValue}>-${expense}</h3>
      </div>
    </div>
  );
};

export default Balance;
