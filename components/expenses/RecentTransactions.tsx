import { useExpenseContext } from "@/context/ExpenseContext";
import { Button, Divider, VStack, Spinner } from "@gluestack-ui/themed";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import TransactionItem from "./TransactionItem";

export default function RecentTransactions() {
  const { transactionDisplay, fetchTransactions, onEdit, onDelete } =
    useExpenseContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchTransactions();
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort transactions by date (latest to oldest) and take the first 3
  const sortedTransactions = transactionDisplay
    .slice()
    .sort((a, b) => {
      // Create Date objects by combining date and time
      const dateTimeA = new Date(`${a.dateTime.date}T${a.dateTime.time}`);
      const dateTimeB = new Date(`${b.dateTime.date}T${b.dateTime.time}`);
      return dateTimeB - dateTimeA; // Latest first
    })
    .slice(0, 3);

  return (
    <VStack space="sm" className="bg-white p-4 rounded-2xl my-0">
      <Text className="text-lg mb-2 font-bold">Recent Transactions</Text>

      {loading ? (
        <View className="py-8 flex items-center justify-center">
          <Spinner size="large" color="blue" />
          <Text className="text-gray-500 mt-2">Loading transactions...</Text>
        </View>
      ) : sortedTransactions.length > 0 ? (
        <>
          {sortedTransactions.map((txn, index) => (
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
              {index !== sortedTransactions.length - 1 && <Divider />}
            </VStack>
          ))}
        </>
      ) : (
        <View className="py-6 flex items-center justify-center">
          <Text className="text-gray-500">No recent transactions found</Text>
        </View>
      )}

      <Button
        onPress={() => {
          router.push("expense/all");
        }}
      >
        <Text className="text-blue-500">View All</Text>
      </Button>
    </VStack>
  );
}
