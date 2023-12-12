import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { income } from "../reducers/income";
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

// Component shows edit page for incomes
const EditIncomePage = ({ onSave, onCancel }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.income.incomeData);
  const selectedIncome = data.find((item) => item.id === id);
  const [type, setType] = useState(selectedIncome ? selectedIncome.type : "");
  const [category, setCategory] = useState(
    selectedIncome ? selectedIncome.category : ""
  );
  const [amount, setAmount] = useState(
    selectedIncome ? String(selectedIncome.amount) : ""
  );
  const [note, setNote] = useState(selectedIncome ? selectedIncome.note : "");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (selectedIncome) {
      setType(selectedIncome.type);
      setCategory(selectedIncome.category);
      setAmount(selectedIncome.amount.toString());
      setNote(selectedIncome.note);
    }
  }, [selectedIncome]);
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
    const editedIncome = {
      id: selectedIncome.id,
      type,
      category,
      amount: parseFloat(amount),
      note,
    };

    dispatch(income.actions.editIncome(editedIncome));
    navigateTo("/");
  };
  const handleDelete = () => {
    dispatch(income.actions.deleteIncome(selectedIncome.id));
    navigateTo("/");
  };
  const handleCancel = () => {
    navigateTo("/");
  };

  return (
    <section className="edit-container">
      <Title>Edit Income</Title>
      <InputContainer className="edit-form">
        <div>
          <LabelInput>
            Type
            <Select
              className="input-box"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="income">Income</option>
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
              <option value="Salary">Salary</option>
              <option value="Bonus">Bonus</option>
              <option value="Allowance">Allowance</option>
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

export default EditIncomePage;
