import React from "react";
import {
  CardContainer,
  Content,
  Note,
  CreateDate,
  EditIcon,
} from "../styles/CardStyle";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

// Component shows each income log
const IncomeCard = ({ income }) => {
  return (
    <>
      <CardContainer>
        <CreateDate>{income.createdAt}</CreateDate>
        <Content>{income.category}</Content>
        <Content>{income.amount}</Content>
        <EditIcon>
          <Link
            to={`/editincome/${income.id}`}
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
      <Note>{income.note}</Note>
    </>
  );
};

export default IncomeCard;
