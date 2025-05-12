import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { useState } from "react";
import { db } from "../../firebaseConfig";
import { navigate } from "expo-router/build/global-state/routing";
export const useTransaction = (
  user,
  router,
  accounts = [],
  fetchAccounts = () => {}
) => {
  const [transaction, setTransaction] = useState({
    userId: user?.uid,
    entryType: "EXPENSE",
    accountType: "",
    category: null,
    notes: "",
    amount: "0",
    dateTime: {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
    },
  });

  const [transactionDisplay, setTransactionDisplay] = useState([]);

  const resetTransaction = () => {
    setTransaction({
      entryType: "EXPENSE",
      accountType: "",
      category: null,
      notes: "",
      amount: "0",
      dateTime: {
        date: new Date().toISOString().split("T")[0],
        time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
      },
    });
  };

  const validateTransaction = () => {
    const { accountType, category, notes, amount, dateTime } = transaction;

    if (!accountType) return "Please select an account type.";
    if (!category) return "Please select a category.";
    if (!notes) return "Please enter notes.";
    if (!amount || isNaN(amount)) return "Please enter a valid amount.";
    if (parseFloat(amount) <= 0) return "Please enter a positive amount.";
    if (!dateTime) return "Please select a date and time.";
    if (dateTime.date > new Date().toISOString().split("T")[0])
      return "Please select a valid date.";
    if (
      dateTime.date === new Date().toISOString().split("T")[0] &&
      dateTime.time > new Date().toTimeString().split(":").slice(0, 2).join(":")
    )
      return "Please select a valid time.";

    return null;
  };
  const handleSave = async () => {
    const error = validateTransaction();
    if (error) {
      alert("Validation Error", error);
      return;
    }

    const { entryType, accountType, category, notes, amount, dateTime } =
      transaction;
    const accountObj = accounts.find((acc) => acc.name === accountType);

    // Prevent negative balance for EXPENSE
    if (
      entryType === "EXPENSE" &&
      accountObj &&
      parseFloat(accountObj.balance || 0) - parseFloat(amount) < 0
    ) {
      alert("Insufficient funds. Account balance cannot go negative.");
      return;
    }

    try {
      await setDoc(doc(db, "transactions", `${Date.now()}`), {
        userId: user?.uid,
        entryType,
        accountType,
        category,
        notes,
        amount: parseFloat(amount),
        dateTime,
      });

      if (accountObj?.id) {
        try {
          const accountRef = doc(db, "accounts", accountObj.id);
          const updatedBalance =
            entryType === "EXPENSE"
              ? parseFloat(accountObj.balance || 0) - parseFloat(amount)
              : parseFloat(accountObj.balance || 0) + parseFloat(amount);

          await setDoc(
            accountRef,
            { balance: updatedBalance },
            { merge: true }
          );
          console.log("Account balance updated successfully");
        } catch (err) {
          console.error("Failed to update balance:", err);
        }
      }

      alert("Transaction saved successfully");
      fetchAccounts(user?.uid);
      resetTransaction();

      router.push("/expenses");
    } catch (err) {
      console.error("Error saving transaction:", err);
      alert("Failed to save transaction.");
    }
  };

  const fetchTransactions = async () => {
    try {
      if (!user?.uid) {
        setTransactionDisplay([]);
        return;
      }
      // Fetch all transactions for the user
      const transactionsQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(transactionsQuery);
      const transactionsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactionDisplay(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await setDoc(doc(db, "transactions", id), {
        isDeleted: true,
      });
      alert("Transaction deleted successfully");
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction.");
    }
  };
  const onEdit = async (id) => {
    try {
      const transactionToEdit = transactionDisplay.find(
        (transaction) => transaction.id === id
      );
      if (transactionToEdit) {
        setTransaction({
          ...transactionToEdit,
          dateTime: {
            date: transactionToEdit.dateTime.date,
            time: transactionToEdit.dateTime.time,
          },
        });
        navigate("/expense/add");
      }



      await setDoc(
        doc(db, "transactions", id),
        {
          isEdited: true,
        },
        { merge: true }
      );
      
      fetchTransactions();
    } catch (error) {
      console.error("Error editing transaction:", error);
      alert("Failed to edit transaction.");
    }
  };

  return {
    transaction,
    setTransaction,
    handleSave,
    transactionDisplay,
    fetchTransactions,
    onDelete,
    onEdit,
  };
};
