import { useExpenseContext } from "@/context/ExpenseContext";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const types = ["INCOME", "EXPENSE"];

export default function TypeSelector() {
  const { transaction, setTransaction } = useExpenseContext();

  return (
    <View className="flex-row justify-evenly space-x-4 border-b border-gray-700 py-2 ">
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() =>
            setTransaction((prev) => ({
              ...prev,
              entryType: type,
            }))
          }
        >
          <Text
            className={`text-lg font-semibold ${
              transaction.entryType === type ? "text-blue " : "text-gray-500"
            }`}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
