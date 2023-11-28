import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { income } from "../reducers/income";
import { expense } from "../reducers/expense";
import {
  InputContainer,
  Input,
  LabelInput,
  ButtonCancel,
  ButtonSave,
  Select,
  ButtonDelete,
} from "../styles/InputFormStyle";

const InputForm = ({ onSave, onCancel, initialData }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isExpenseCategory, setIsExpenseCategory] = useState(true);

  // Use useEffect to set initial values when in edit mode
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setCategory(initialData.category);
      setAmount(initialData.amount.toString());
      setNote(initialData.note);
    }
  }, [initialData]);

  const handleSave = () => {
    const truncatedNote = note.substring(0, MAX_NOTE_LENGTH);
    if (!amount || parseFloat(amount) < 0) {
      alert(
        "Oops! It looks like you forgot to enter an amount or invalid amount."
      );
      return;
    } else if (!type) {
      alert("OOps! It looks like you forgot to select a transaction type.");
      return;
    } else if (!category) {
      alert("OOps! It looks like you forgot to select a category.");
      return;
    }

    const transaction = {
      id: initialData ? initialData.id : undefined, 
      category,
      amount: parseFloat(amount),
      note: truncatedNote,
    };

    if (initialData) {
      if (type === "income") {
        dispatch(income.actions.editIncome(transaction));
      } else if (type === "expense") {
        dispatch(expense.actions.editExpense(transaction));
      }
    } else {
      if (type === "income") {
        dispatch(income.actions.addIncome(transaction));
      } else if (type === "expense") {
        dispatch(expense.actions.addExpense(transaction));
      }
    }

    // Clear the form
    setType("");
    setCategory("");
    setAmount("");
    setNote("");

    // Call the onSave callback
    onSave(transaction);
  };

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setIsExpenseCategory(selectedType === "expense");
    setCategory(""); // Reset category when type changes
  };

  const handleDelete = () => {
    if (type === "expense") {
      dispatch(expense.actions.deleteExpense());
    } else if (type === "income") {
      dispatch(income.actions.deleteIncome());
    }
    onCancel();
  };

  return (
    <InputContainer>
      <div>
        <LabelInput>
          Type
          <Select
            value={type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </LabelInput>
      </div>
      <div>
        <LabelInput>
          Category
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {isExpenseCategory ? (
              <>
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Social Life">Social Life</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Household">Household</option>
                <option value="Beauty">Beauty</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="">Select category</option>
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Allowance">Allowance</option>
                <option value="Other">Other</option>
              </>
            )}
          </Select>
        </LabelInput>
      </div>
      <div>
        <LabelInput>
          Amount
          <Input
            type="number"
            placeholder=""
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </LabelInput>
      </div>
      <div>
        <LabelInput>
          {" "}
          Note
          <Input
            type="text"
            placeholder="Optional"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </LabelInput>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {initialData && (
            <ButtonDelete onClick={handleDelete}>Delete</ButtonDelete>
          )}
        </div>
        <div>
          <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
          <ButtonSave onClick={handleSave}>Save</ButtonSave>
        </div>
      </div>
    </InputContainer>
  );
};

export default InputForm;
