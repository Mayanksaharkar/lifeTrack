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
  const [newStateVariable, setNewStateVariable] = useState(null);

  //***************************************************************************************************************** */
  // Transaction Screen

  const handleSave = () => {
    console.log({ entryType, account, category, notes, amount, dateTime });
    router.push("/expenses");
  };
  const [entryType, setEntryType] = useState("EXPENSE");
  const [accountType, setAccountType] = useState("");
  const [category, setCategory] = useState(null);
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("0");
  const [dateTime, setDateTime] = useState({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
  });

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
    console.log("Edit account with id:", id);
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

  return (
    <ExpenseContext.Provider
      value={{
        handleSave,
        newStateVariable,
        setNewStateVariable,
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
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenseContext = () => useContext(ExpenseContext);
export default ExpenseContext;
