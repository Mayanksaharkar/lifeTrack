import { Button, Text, VStack, View } from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import RecentTransactions from "../../components/expenses/RecentTransactions";
import AccountsDisplay from "../../components/expenses/AccountsDisplay";
const Expenses = () => {
  const router = useRouter();
  return (
    <View height={"100%"} width="100%" className="bg-slate-100 ">
      <ScrollView className="p-4 bg-gray/50 h-full">
        <VStack space="md">
          <Button
            onPress={() => router.push("/expense/add")}
            backgroundColor="$blue500"
            variant="solid"
            size="lg"
          >
            <Text color="$white">Add New Transaction</Text>
          </Button>

          <RecentTransactions />
          <AccountsDisplay />
        </VStack>
      </ScrollView>{" "}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Expenses;
