import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebaseConfig";

export const useTransaction = (
  user,
  router,
  accounts = [],
  fetchAccounts = () => {}
) => {
  const [transaction, setTransaction] = useState({
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

    try {
      await setDoc(doc(db, "transactions", `${Date.now()}`), {
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

  return {
    transaction,
    setTransaction,
    handleSave,
  };
};
