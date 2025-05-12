import { useExpenseContext } from "@/context/ExpenseContext";
import { ChevronDown, Wallet } from "lucide-react-native";
import React, { use, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
export default function AccSelector() {
  const { accounts, transaction, setTransaction, fetchAccounts } = useExpenseContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  // Use the selected account from transaction context
  const selected = transaction.accountType || "";

  const handleSelect = (item) => {
    setTransaction((prev) => ({
      ...prev,
      accountType: item,
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
          <Wallet color="#3b82f6" size={20} />
          <Text className="text-blue font-semibold">
            {selected || "Select Account"}
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
          <View className="bg-white rounded-xl w-4/5 max-w-[300px] p-4">
            <Text className="text-lg font-bold text-center mb-4 text-blue-500">
              Select Account
            </Text>
            {accounts && accounts.length > 0 ? (
              accounts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelect(item.name)}
                  className="py-3 px-4 border-b border-gray-200"
                >
                  <Text className="text-base text-gray-800">{item.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-center text-gray-400">
                No accounts found
              </Text>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
