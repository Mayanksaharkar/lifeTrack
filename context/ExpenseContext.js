import { useRouter } from "expo-router";
import { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useAccountManager } from "./Expense/useAccountManager";
import { useTransaction } from "./Expense/useTransaction";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    accounts,
    setAccounts,
    accModalVisible,
    setAccModalVisible,
    newAccount,
    setNewAccount,
    handleDelete,
    handleEdit,
    handleAccountAdd,
    fetchAccounts,
  } = useAccountManager(user);

  const { transaction, setTransaction, handleSave } = useTransaction(
    user,
    router,
    accounts,
    fetchAccounts
  );

  useEffect(() => {
    if (user) fetchAccounts(user.uid);
  }, [user]);

  return (
    <ExpenseContext.Provider
      value={{
        handleSave,
        transaction,
        setTransaction,
        accounts,
        setAccounts,
        accModalVisible,
        setAccModalVisible,
        newAccount,
        setNewAccount,
        handleDelete,
        handleEdit,
        handleAccountAdd,
        fetchAccounts,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
