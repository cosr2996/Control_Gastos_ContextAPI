import type { category, DraftExpence, Expence } from "../types";
import { v4 as uuidv4 } from "uuid";

export type BudgeActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show-modal" }
  | { type: "close-modal" }
  | { type: "add-expense"; payload: { expense: DraftExpence } }
  | { type: "remove-expense"; payload: { id: Expence["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expence["id"] } }
  | { type: "update-expense"; payload: { expense: Expence } }
  | { type: "resetApp" }
  | { type: "add-filter-category", payload:{id:category['id']}}

const createExpense = (DraftExpence: DraftExpence): Expence => {
  return {
    ...DraftExpence,
    id: uuidv4(),
  };
};

export type BudgeState = {
  budget: number;
  modal: boolean;
  expenses: Expence[];
  editingId: Expence["id"];
  currentCategory: category['id']
};

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? +localStorageBudget : 0;
};

const initialExpenses = (): Expence[] => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState: BudgeState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: "",
  currentCategory:''
};

export const budgetReducer = (
  state: BudgeState = initialState,
  action: BudgeActions
): BudgeState => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-modal") {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === "close-modal") {
    return {
      ...state,
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      editingId: "",
    };
  }

  if (action.type === "resetApp") {
    return {
      ...state,
      budget: 0,
      expenses: [],
    };
  }

  if (action.type === "add-filter-category") {
    return {
      ...state,
      currentCategory:action.payload.id
    };
  }

  return state;
};
