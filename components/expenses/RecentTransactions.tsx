import { Divider, VStack } from "@gluestack-ui/themed";
import { Text } from "react-native";
import TransactionItem from "./TransactionItem";
import { useExpenseContext } from "@/context/ExpenseContext";
import { use, useEffect } from "react";
export default function RecentTransactions() {
  const { transactionDisplay, fetchTransactions, onEdit, onDelete } = useExpenseContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTransactions();
    };

    fetchData();
  }, []);



  return (
    <VStack space="sm" className="bg-white p-4 rounded-2xl my-4">
      <Text className="text-lg mb-2 font-bold">Recent Transactions</Text>

      {transactionDisplay.map((txn, index) => (
        <VStack key={index}>
          <TransactionItem
            account={txn.accountType}
            label={txn.category}
            date={`${txn.dateTime.date}, ${txn.dateTime.time}`}
            amount={txn.amount}
            notes={txn.notes}
            entryType={txn.entryType}
            onDelete={() => onDelete(txn.id)}
            onEdit={() => onEdit(txn.id)}
          />
          {index !== transactionDisplay.length - 1 && <Divider />}
        </VStack>
      ))}
    </VStack>
  );
}
