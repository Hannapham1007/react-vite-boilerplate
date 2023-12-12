import React, { useState } from "react";
import { useSelector } from "react-redux";
import IncomeCard from "./IncomeCard";
import { income } from "../reducers/income";
import { ListContainer, H3Income, TextMessage } from "../styles/ListStyle";

const IncomeList = ({ searchInput }) => {
  const allIncome = useSelector((store) => store.income.incomeData);
  const filteredIncome = allIncome.filter((item) =>
    item.category.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <section>
      <H3Income>Incomes</H3Income>
      <ListContainer className="list-container">
        {filteredIncome.length === 0 ? (
          <TextMessage>No data available.</TextMessage>
        ) : (
          <div>
            {filteredIncome.map((item) => (
              <IncomeCard income={item} key={item.id} />
            ))}
          </div>
        )}
      </ListContainer>
    </section>
  );
};

export default IncomeList;
