import React from "react";
import { useSelector } from "react-redux";
import AddTransaction from "./AddTransaction";
import {
  IncomeStyle,
  ExpenseStyle,
  BalanceStyle,
  BalanceContainer,
  BalanceTopBox,
  AddContainer,
} from "../styles/BalanceStyle";

//Component shows the sum of incomes, expenses and balance
const Balance = () => {
  const incomeData = useSelector((store) => store.income.incomeData);
  const expenseData = useSelector((store) => store.expense.expenseData);

  //Calculate the sum of income and expense
  const totalIncome = incomeData.reduce(
    (total, income) => total + income.amount,
    0
  );
  const totalExpense = expenseData.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  //Calculate the balance
  const balance = totalIncome - totalExpense;

  return (
    <section className="balance">
      <BalanceContainer className="balance-container">
        <BalanceTopBox>
          <div>
            <h3 style={{ margin: "0", padding: "0" }}>Income</h3>
            <IncomeStyle> {totalIncome}</IncomeStyle>
          </div>
          <div>
            <h3 style={{ margin: "0", padding: "0" }}>Expense</h3>
            <ExpenseStyle> {totalExpense}</ExpenseStyle>
          </div>
          <div>
            <h3 style={{ margin: "0", padding: "0" }}>Balance</h3>
            <BalanceStyle> {balance}</BalanceStyle>
          </div>
        </BalanceTopBox>
        <AddContainer>
          <AddTransaction />
        </AddContainer>
      </BalanceContainer>
    </section>
  );
};

export default Balance;
