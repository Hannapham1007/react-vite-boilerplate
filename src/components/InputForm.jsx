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
} from "../styles/InputFormStyle";

const InputForm = ({ onSave, onCancel, initialData }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const MAX_NOTE_LENGTH = 40;
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setCategory(initialData.category);
      setAmount(initialData.amount.toString());
      setNote(initialData.note);
    } else {
      setType("");
      setCategory("");
      setAmount("");
      setNote("");
    }
  }, [initialData]);
  const handleNoteChange = (value) => {
    if (value.length > MAX_NOTE_LENGTH) {
      alert("Your note is too long 😞, the maximum length is 40 characters.");
      return;
    }
    setNote(value);
  };
  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0 || !type || !category) {
      alert(
        "Oops! Please make sure to enter a valid amount, select a transaction type, and choose a category."
      );
      return;
    }
    const transaction = {
      category,
      amount: parseFloat(amount),
      note,
    };
    if (type === "income") {
      dispatch(income.actions.addIncome(transaction));
    } else if (type === "expense") {
      dispatch(expense.actions.addExpense(transaction));
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
    setCategory("");
  };

  return (
    <InputContainer>
      <div>
        <LabelInput>
          Type
          <Select
            className="input-box"
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
            className="input-box"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "expense" ? (
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
            ) : type === "income" ? (
              <>
                <option value="">Select category</option>
                <option value="Salary">Salary</option>
                <option value="Bonus">Bonus</option>
                <option value="Allowance">Allowance</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <option value="">Select category</option>
            )}
          </Select>
        </LabelInput>
      </div>
      <div>
        <LabelInput>
          Amount
          <Input
            className="input-box"
            type="number"
            name="amount"
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
            className="input-box"
            type="text"
            name="note"
            placeholder="Optional"
            value={note}
            onChange={(e) => handleNoteChange(e.target.value)}
          />
        </LabelInput>
        {note.length > MAX_NOTE_LENGTH && (
          <div style={{ color: "red" }}>Note cannot exceed 40 characters.</div>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
        </div>
        <div>
          <ButtonSave onClick={handleSave}>Save</ButtonSave>
        </div>
      </div>
    </InputContainer>
  );
};

export default InputForm;
