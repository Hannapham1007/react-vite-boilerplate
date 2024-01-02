import React from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import {
  CardContainer,
  Note,
  Content,
  CreateDate,
  EditIcon,
} from "../styles/CardStyle";


//Component shows an expense log
const Expense = ({ expense }) => {
  return (
    <>
      <CardContainer>
        <CreateDate>{expense.createdAt}</CreateDate>
        <Content>{expense.category}</Content>
        <Content>{expense.amount} kr</Content>
        <EditIcon>
          <Link
            to={`/editexpense/${expense.id}`}
            style={{
              fontSize: "14px",
              color: "var(--color-text)",
              border: "1px solid lightgrey",
              borderRadius: "4px",
              paddingTop: "4px",
              paddingRight: "3px",
              paddingLeft: "3px",
            }}
          >
            <FaEllipsisV />
          </Link>
        </EditIcon>
      </CardContainer>
      <Note>{expense.note}</Note>
    </>
  );
};

export default Expense;
