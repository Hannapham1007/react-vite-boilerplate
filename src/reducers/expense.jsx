import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const loadStateFromLocalStorage = (key) => {
  const serializedState = localStorage.getItem(key);
  return serializedState ? JSON.parse(serializedState) : undefined;
};

const saveStateToLocalStorage = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    console.error("Error saving to local storage:", e);
  }
};
export const expense = createSlice({
    name: "expense",
    initialState: {
      expenseData: loadStateFromLocalStorage("expense") || [],
    },
    reducers: {
        addExpense: (state, action) => {
          const { type, category, amount, note } = action.payload;
          const newExpense = {
            id: uuidv4(),
            type: type,
            category: category,
            amount: amount,
            note: note,
            createdAt:  moment().format("MMM DD"),
          };
          state.expenseData = [newExpense, ...state.expenseData];
          saveStateToLocalStorage("expense", state.expenseData);
        }, 
        editExpense: (state, action) =>{
          const { id, type, category, amount, note} = action.payload;
            state.expenseData = state.expenseData.map((item) =>
              item.id === id ? { ...item, type, category, amount, note } : item
            );
            saveStateToLocalStorage("expense", state.expenseData);
        },
        deleteExpense: (state, action) =>{
          state.expenseData.splice(action.payload, 1);
          saveStateToLocalStorage("expense", state.expenseData);
        }
      }
})