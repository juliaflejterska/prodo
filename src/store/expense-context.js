import { createContext, useReducer } from "react";

const DUMMYTRANSACTIONS = [
  { id: 1, text: "salary", amount: +500 },
  { id: 2, text: "shopping", amount: -100 },
  { id: 3, text: "from mom", amount: +50 },
  { id: 4, text: "rent", amount: -300 },
  { id: 5, text: "drinks", amount: -20 },
  { id: 6, text: "cake", amount: -40 },
];

let fetchedTransactions = [];
if (!localStorage.getItem("transactions")) {
  localStorage.setItem("transactions", JSON.stringify([...DUMMYTRANSACTIONS]));
  fetchedTransactions = DUMMYTRANSACTIONS;
} else {
  fetchedTransactions = JSON.parse(localStorage.getItem("transactions"));
}
console.log(fetchedTransactions);

const initialState = {
  transactions: [...fetchedTransactions],
};

export const ExpenseContext = createContext(initialState);

export const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      localStorage.setItem(
        "transactions",
        JSON.stringify([action.payload, ...state.transactions])
      );

      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "DELETE":
      localStorage.setItem(
        "transactions",
        JSON.stringify(
          state.transactions.filter(
            (transcation) => transcation.id !== action.payload
          )
        )
      );
      return {
        ...state,
        transactions: state.transactions.filter(
          (transcation) => transcation.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpenseReducer, initialState);

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD",
      payload: transaction,
    });
    console.log(state);
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
