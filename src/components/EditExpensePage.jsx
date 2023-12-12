import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { expense } from "../reducers/expense";
import { useNavigate } from "react-router-dom";

import {
  InputContainer,
  Input,
  LabelInput,
  ButtonCancel,
  ButtonSave,
  ButtonDelete,
  Select,
  Title,
} from "../styles/InputFormStyle";

// Component shows edit page for expenses
const EditExpensePage = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.expense.expenseData);
  const selectedExpense = data.find((item) => item.id === id);
  console.log(selectedExpense);

  const [type, setType] = useState(selectedExpense ? selectedExpense.type : "");
  const [category, setCategory] = useState(
    selectedExpense ? selectedExpense.category : ""
  );
  const [amount, setAmount] = useState(
    selectedExpense ? String(selectedExpense.amount) : ""
  );
  const [note, setNote] = useState(selectedExpense ? selectedExpense.note : "");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (selectedExpense) {
      setType(selectedExpense.type);
      setCategory(selectedExpense.category);
      setAmount(selectedExpense.amount.toString());
      setNote(selectedExpense.note);
    }
  }, [selectedExpense]);
  console.log(selectedExpense);
  const MAX_NOTE_LENGTH = 40;

  const handleNoteChange = (value) => {
    if (value.length > MAX_NOTE_LENGTH) {
      alert("Your note is too long 😞, the maximum length is 40 characters.");
      return;
    }
    setNote(value);
  };

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0 || !category) {
      alert(
        "Oops! Please make sure to enter a valid amount, select a category."
      );
      return;
    }

    const editedExpense = {
      id: selectedExpense.id,
      type,
      category,
      amount: parseFloat(amount),
      note,
    };

    dispatch(expense.actions.editExpense(editedExpense));
    navigateTo("/");
  };

  const handleDelete = () => {
    dispatch(expense.actions.deleteExpense(selectedExpense.id));
    navigateTo("/");
  };
  const handleCancel = () => {
    navigateTo("/");
  };

  return (
    <section className="edit-container">
      <Title>Edit Expense</Title>
      <InputContainer className="edit-form">
        <div>
          <LabelInput>
            Type
            <Select
              className="input-box"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Expense</option>
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
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Social Life">Social Life</option>
              <option value="Transport">Transport</option>
              <option value="Health">Health</option>
              <option value="Household">Household</option>
              <option value="Beauty">Beauty</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
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
            <div style={{ color: "red" }}>
              Note cannot exceed 40 characters.
            </div>
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
            <ButtonDelete onClick={handleDelete}>Delete</ButtonDelete>
          </div>
          <div>
            <ButtonCancel onClick={handleCancel}>Cancel</ButtonCancel>
            <ButtonSave onClick={handleSave}>Save</ButtonSave>
          </div>
        </div>
      </InputContainer>
    </section>
  );
};

export default EditExpensePage;
