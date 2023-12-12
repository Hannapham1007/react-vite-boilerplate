import React, { useState } from "react";
import InputForm from "./InputForm";
import { FaPlus } from "react-icons/fa";

// Component shows "Add new transaction"
const AddTransaction = () => {
  const [isFormVisible, setFormVisibility] = useState(false);
  //Function to handle cancelling the input
  const handleCancel = () => {
    setFormVisibility(false);
  };

  //Function to handle showing the input form
  const handleShowForm = () => {
    setFormVisibility(true);
  };

  const handleSave = (transaction) => {
    console.log(transaction);
    setFormVisibility(false);
  };

  return (
    <div>
      <FaPlus
        style={{
          color: "var(--white)",
          background: "var(--primary)",
          borderRadius: "50%",
          padding: "8px 8px",
        }}
        onClick={handleShowForm}
      ></FaPlus>
      {isFormVisible && (
        <InputForm onCancel={handleCancel} onSave={handleSave} />
      )}
    </div>
  );
};

export default AddTransaction;
