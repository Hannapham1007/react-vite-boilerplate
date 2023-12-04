import React, { useState } from "react";
import Balance from "./Balance";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import moment from "moment";
import { Date, SearchInput, SearchContainer } from "../styles/HomeStyle";
import { FaSearch } from "react-icons/fa";

const date = moment().format("dddd, ll");

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <section className="home-container">
      <Date>{date}</Date>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by transaction category..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FaSearch style={{ marginRight: "8px", color: "var(--primary)" }} />
      </SearchContainer>
      <Balance />
      <IncomeList searchInput={searchInput} />
      <ExpenseList searchInput={searchInput} />
    </section>
  );
};

export default Home;
