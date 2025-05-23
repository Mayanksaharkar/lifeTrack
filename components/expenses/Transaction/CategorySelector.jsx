import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity } from "react-native";
import { View } from "@gluestack-ui/themed";
import { useExpenseContext } from "@/context/ExpenseContext";
import {
  Baby,
  Bus,
  Car,
  ChevronDown,
  CircleDashed,
  Dumbbell,
  GraduationCap,
  Home,
  Laptop,
  Phone,
  Plane,
  Receipt,
  Scissors,
  Shield,
  Shirt,
  ShoppingBag,
  Stethoscope,
  Tag,
  Users,
  Utensils,
} from "lucide-react-native";

// Expense categories
const EXPENSE_CATEGORY_OPTIONS = [
  { label: "Baby", value: "Baby", Icon: Baby },
  { label: "Beauty", value: "Beauty", Icon: Scissors },
  { label: "Clothing", value: "Clothing", Icon: Shirt },
  { label: "Car", value: "Car", Icon: Car },
  { label: "Education", value: "Education", Icon: GraduationCap },
  { label: "Electronics", value: "Electronics", Icon: Laptop },
  { label: "Food", value: "Food", Icon: Utensils },
  { label: "Health", value: "Health", Icon: Stethoscope },
  { label: "Home", value: "Home", Icon: Home },
  { label: "Insurance", value: "Insurance", Icon: Shield },
  { label: "Shopping", value: "Shopping", Icon: ShoppingBag },
  { label: "Sports", value: "Sports", Icon: Dumbbell },
  { label: "Social", value: "Social", Icon: Users },
  { label: "Tax", value: "Tax", Icon: Receipt },
  { label: "Telecom", value: "Telecom", Icon: Phone },
  { label: "Travel", value: "Travel", Icon: Plane },
  { label: "Transport", value: "Transport", Icon: Bus },
  { label: "Other", value: "Other", Icon: CircleDashed },
];

// Income categories
const INCOME_CATEGORY_OPTIONS = [
  { label: "Salary", value: "Salary", Icon: Tag },
  { label: "Gift", value: "Gift", Icon: Users },
  { label: "Interest", value: "Interest", Icon: Receipt },
  { label: "Investments", value: "Investments", Icon: Laptop },
  { label: "Rental Income", value: "Rental Income", Icon: Home },
  { label: "Other", value: "Other", Icon: CircleDashed },
];

export default function CategorySelector() {
  const [modalVisible, setModalVisible] = useState(false);
  const { transaction, setTransaction } = useExpenseContext();

  const selected = transaction.category || "";

  // Decide category list based on transaction type
  const categoryOptions =
    transaction.entryType === "INCOME"
      ? INCOME_CATEGORY_OPTIONS
      : EXPENSE_CATEGORY_OPTIONS;

  const handleSelect = (value) => {
    setTransaction((prev) => ({
      ...prev,
      category: value,
    }));
    setModalVisible(false);
  };

  return (
    <View className="w-[48%]">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-gray-100 rounded-lg p-3 flex-row items-center justify-between"
      >
        <View className="flex-row items-center space-x-2 gap-1">
          <Tag color="#3b82f6" size={20} />
          <Text className="text-blue font-semibold">
            {selected || "Select Category"}
          </Text>
        </View>
        <ChevronDown color="#3b82f6" size={16} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black/30 justify-center items-center"
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white rounded-xl w-4/5 max-w-[340px] p-4">
            <Text className="text-lg font-bold text-center mb-4 text-blue-500">
              Select Category
            </Text>

            <View className="flex-row flex-wrap justify-between">
              {categoryOptions.map(({ label, value, Icon }) => (
                <TouchableOpacity
                  key={value}
                  onPress={() => handleSelect(value)}
                  className="w-[30%] h-24 m-1 rounded-lg bg-white items-center gap-1"
                >
                  <View
                    rounded={30}
                    width="$full"
                    height="$full"
                    justifyContent="center"
                    alignItems="center"
                    className="rounded-lg w-full h-full items-center gap-1"
                  >
                    <Icon color="#3b82f6" size={30} strokeWidth={1} />
                    <Text className="text-sm text-center">{label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
