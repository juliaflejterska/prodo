import { useState, useContext } from "react";
import { ExpenseContext } from "../../store/expense-context";
import classes from "./AddTransaction.module.css";

const AddTransaction = () => {
  const { addTransaction } = useContext(ExpenseContext);

  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);

  const textHandler = (e) => {
    setText(e.target.value);
  };

  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (text === "" || text.length === 0) {
      alert("Name cannot be empty. Please enter a valid name.");
      return;
    }

    if (amount === 0) {
      alert(
        "Amounts should be positive or negative values. Please enter a valid amount."
      );
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000),
      text: text,
      amount: +amount,
    };

    setAmount(0);
    setText("");

    addTransaction(newTransaction);
    //window.location.reload(true);
  };

  return (
    <div className={classes.form}>
      <div>
        <h2 className={classes.title}>NEW TRANSACTION</h2>
      </div>

      <div>
        <form onSubmit={submitHandler}>
          <h3>name</h3>
          <input
            className={classes.input}
            type="text"
            placeholder="enter text"
            value={text}
            onChange={textHandler}
          />
          <h3>positive/negative amount</h3>
          <input
            className={classes.input}
            type="number"
            placeholder="enter amount"
            value={amount}
            onChange={amountHandler}
          />
          <br />
          <button className={classes.btn}>
            <span className={classes.span}>ADD</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
