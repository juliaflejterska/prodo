import { useContext } from "react";
import { ExpenseContext } from "../../store/expense-context";
import classes from "./Transaction.module.css";
import { RiCloseCircleLine } from "react-icons/ri";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(ExpenseContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  const deleteHandler = () => {
    deleteTransaction(transaction.id);
  };

  return (
    <li className={classes.transactions}>
      <div className={classes.transaction}>
        <h4
          className={
            transaction.amount > 0 ? classes.positive : classes.negative
          }
        >
          {sign}${Math.abs(transaction.amount)}
        </h4>
        <h4>{transaction.text}</h4>
      </div>

      <div className={classes.transaction}>
        <RiCloseCircleLine className={classes.icon} onClick={deleteHandler} />
      </div>
    </li>
  );
};

export default Transaction;
