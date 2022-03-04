import { ExpenseContext } from "../../store/expense-context";
import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./Transactions.module.css";

import Transaction from "./Transaction";

const Transactions = () => {
  const { transactions } = useContext(ExpenseContext);

  const [alphIsClicked, setAlphIsClicked] = useState(false);
  const [ascIsClicked, setAscIsClicked] = useState(false);
  const [descIsClicked, setDescIsClicked] = useState(false);

  const [pageNum, setPageNum] = useState(0);
  const transPerPage = 5;
  const pagesVisited = pageNum * transPerPage;
  const pageCount = Math.ceil(transactions.length / transPerPage);

  const alphClickHandler = () => {
    setAscIsClicked(false);
    setDescIsClicked(false);
    setAlphIsClicked(true);
  };

  const ascClickHandler = () => {
    setAlphIsClicked(false);
    setDescIsClicked(false);
    setAscIsClicked(true);
  };

  const descClickHandler = () => {
    setAlphIsClicked(false);
    setAscIsClicked(false);
    setDescIsClicked(true);
  };

  if (alphIsClicked) {
    const sortTransactionsAlph = (x, y) => {
      return x.text.localeCompare(y.text);
    };
    transactions.sort(sortTransactionsAlph);
  }

  if (ascIsClicked) {
    const sortTransactionsAsc = (x, y) => {
      return x.amount > y.amount ? 1 : y.amount > x.amount ? -1 : 0;
    };
    transactions.sort(sortTransactionsAsc);
  }

  if (descIsClicked) {
    const sortTransactionsDesc = (x, y) => {
      return x.amount > y.amount ? -1 : y.amount > x.amount ? 1 : 0;
    };
    transactions.sort(sortTransactionsDesc);
  }

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };

  const displayTransactions = transactions
    .slice(pagesVisited, pagesVisited + transPerPage)
    .map((transaction) => {
      return <Transaction key={transaction.id} transaction={transaction} />;
    });

  return (
    <>
      <div className={classes.transactions}>
        <div className={classes.container}>
          <button className={classes.btn} onClick={alphClickHandler}>
            <span className={classes.span}>SORT ALPH</span>
          </button>

          <button className={classes.btn} onClick={ascClickHandler}>
            <span className={classes.span}>SORT ASC</span>
          </button>

          <button className={classes.btn} onClick={descClickHandler}>
            <span className={classes.span}>SORT DESC</span>
          </button>
        </div>
      </div>

      <ul>
        <div className={classes.list}>
          <div className={classes.items}>{displayTransactions}</div>

          <div className={classes.pagination}>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={classes.container}
              activeClassName={classes.active}
            />
          </div>
        </div>
      </ul>
    </>
  );
};

export default Transactions;
