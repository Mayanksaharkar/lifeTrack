import { createContext, useContext } from 'react';
const ExpenseContext = createContext({
  handleSave: () => {},
  setHandleSave: (fn) => {}
});

export const useExpenseContext = () => useContext(ExpenseContext);
export default ExpenseContext;
