import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { DollarSign } from "lucide-react-native";
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { ref } from "firebase/storage";
import { useCallback } from "react";
export const useAccountManager = (user) => {
  const [accounts, setAccounts] = useState([]);
  const [accModalVisible, setAccModalVisible] = useState(false);
  const [newAccount, setNewAccount] = useState({
    name: "",
    balance: "",
    icons: DollarSign,
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback((userId) => {
    setRefreshing(true);
    fetchAccounts(userId);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const fetchAccounts = async () => {
    setRefreshing(true);
    if (!user.uid) return setAccounts([]);
    const q = query(
      collection(db, "accounts"),
      where("userId", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    setAccounts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setRefreshing(false);
  };

  const handleAccountAdd = async ({ newAccount, userId }) => {
    const data = {
      name: newAccount.name,
      balance: parseFloat(newAccount.balance),
      userId,
    };
    if (newAccount.id) {
      await setDoc(doc(db, "accounts", newAccount.id), data);
    } else {
      await addDoc(collection(db, "accounts"), data);
    }
    fetchAccounts(userId);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "accounts", id));
    fetchAccounts();
  };

  const handleEdit = (id) => {
    const accountToEdit = accounts.find((a) => a.id === id);
    if (accountToEdit) {
      setNewAccount({
        id: accountToEdit.id,
        name: accountToEdit.name,
        balance: accountToEdit.balance.toString(),
      });
      setAccModalVisible(true);
    }
  };

  return {
    accounts,
    setAccounts,
    accModalVisible,
    setAccModalVisible,
    newAccount,
    setNewAccount,
    handleAccountAdd,
    handleDelete,
    handleEdit,
    fetchAccounts,
    onRefresh,
    refreshing,
    setRefreshing,
  };
};
