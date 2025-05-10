import { useRouter } from "expo-router";
import {
  CreditCard,
  DollarSign,
  IndianRupee,
  PiggyBank,
} from "lucide-react-native";
import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext({
  handleSave: () => {},
});

export const ExpenseProvider = ({ children }) => {
  const router = useRouter();
  const [entryType, setEntryType] = useState("EXPENSE");
  const [accountType, setAccountType] = useState("");
  const [category, setCategory] = useState(null);
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("0");
  const [dateTime, setDateTime] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
  });

  const handleSave = () => {
    try {
      // Log all the data
      const transactionData = {
        entryType,
        accountType,
        category,
        notes,
        amount,
        dateTime
      };
      
      console.log("Saving transaction with data:", transactionData);
      
      // Validate required fields
      if (!amount || amount === "0") {
        console.warn("Amount is required and must be greater than 0");
        return;
      }
      
      if (!accountType) {
        console.warn("Account type is required");
        return;
      }
      
      if (!category) {
        console.warn("Category is required");
        return;
      }
      
      // Here you would typically save to a database or storage
      // For now, we'll just navigate back
      router.push("/expenses");
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  //***************************************************************************************************************** */
  //expense screen

  const Accounts = [
    { id: 1, name: "Card", balance: 0, icon: CreditCard },
    { id: 2, name: "Cash", balance: 0, icon: IndianRupee },
    { id: 3, name: "Saving", balance: 0, icon: PiggyBank },
  ];
  const [accounts, setAccount] = useState(Accounts);

  const [accModalVisible, setAccModalVisible] = useState(false);

  const [newAccount, setNewAccount] = useState({
    id: Math.floor(Math.random() * 1000),
    name: "",
    balance: "",
    icons: DollarSign,
  });

  const handleDelete = (id) => {
    setAccount((prev) => prev.filter((acc) => acc.id !== id));
  };

  const handleEdit = (id) => {
    const accountToEdit = accounts.find((acc) => acc.id === id);
    if (accountToEdit) {
      setNewAccount({
        id: accountToEdit.id,
        name: accountToEdit.name,
        balance: accountToEdit.balance.toString(),
        icons: accountToEdit.icon,
      });
      setAccModalVisible(true);
    }
  };

  const handleAccountAdd = (newAccount) => {
    setAccount((prevAccounts) => {
      const existingAccountIndex = prevAccounts.findIndex(acc => acc.id === newAccount.id);
      if (existingAccountIndex !== -1) {
        const updatedAccounts = [...prevAccounts];
        updatedAccounts[existingAccountIndex] = newAccount;
        return updatedAccounts;
      }
      return [...prevAccounts, newAccount];
    });
  };

  const contextValue = {
    handleSave,
    entryType,
    setEntryType,
    accountType,
    setAccountType,
    category,
    setCategory,
    notes,
    setNotes,
    amount,
    setAmount,
    dateTime,
    setDateTime,
    accounts,
    setAccount,
    accModalVisible,
    setAccModalVisible,
    newAccount,
    setNewAccount,
    handleDelete,
    handleEdit,
    handleAccountAdd,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenseContext must be used within an ExpenseProvider');
  }
  return context;
};

export default ExpenseContext;