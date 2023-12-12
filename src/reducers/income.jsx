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

export const income = createSlice({
  name: "income",
  initialState: {
    incomeData: loadStateFromLocalStorage("income") || [],
  },
  reducers: {
    addIncome: (state, action) => {
      const { type, category, amount, note } = action.payload;
      const newIncome = {
        id: uuidv4(),
        type: type,
        category: category,
        amount: amount,
        note: note,
        createdAt: moment().format("MMM DD"),
      };
      state.incomeData = [newIncome, ...state.incomeData];
      saveStateToLocalStorage("income", state.incomeData);
    },

    editIncome: (state, action) => {
      const { id, type, category, amount, note } = action.payload;
      state.incomeData = state.incomeData.map((item) =>
        item.id === id
          ? {
              ...item,
              type,
              category,
              amount,
              note,
              createdAt: moment().format("MMM DD"),
            }
          : item
      );
      saveStateToLocalStorage("income", state.incomeData);
    },
    deleteIncome: (state, action) => {
      state.incomeData.splice(action.payload, 1);
      saveStateToLocalStorage("income", state.incomeData);
    },
  },
});
