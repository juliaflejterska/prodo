import { useContext } from "react";
import { ExpenseContext } from "../../store/expense-context";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const TransactionsCharts = () => {
  const { transactions } = useContext(ExpenseContext);
  return (
    <BarChart
      data={transactions}
      width={400}
      height={300}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="text" hide="true" />
      <YAxis tickCount={8} />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="amount">
        {transactions.map((transaction, entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={transaction.amount > 0 ? "#136f63" : "#d00000"}
          />
        ))}
      </Bar>
    </BarChart>
  );
};

export default TransactionsCharts;
