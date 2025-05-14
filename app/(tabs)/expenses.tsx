import { Button, Text, VStack, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import AccountsDisplay from "../../components/expenses/AccountsDisplay";
import RecentTransactions from "../../components/expenses/RecentTransactions";
import { ExpenseProvider } from "../../context/ExpenseContext";
const Expenses = () => {
  const router = useRouter();
  return (
    <ExpenseProvider>
      <View height={"100%"} width="100%" className="bg-slate-100 ">
        <ScrollView className="p-4 bg-gray/50 h-full">
          <VStack >
            <Button
              onPress={() => router.push("/expense/add")}
              backgroundColor="$blue500"
              variant="solid"
              size="lg"
            >
              <Text color="$white">Add New Transaction</Text>
            </Button>

            <AccountsDisplay />
            <RecentTransactions />
          </VStack>
        </ScrollView>
      </View>
    </ExpenseProvider>
  );
};

export default Expenses;
