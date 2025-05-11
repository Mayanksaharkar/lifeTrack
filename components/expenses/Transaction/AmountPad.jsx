import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useExpenseContext } from '../../../context/ExpenseContext';
const padKeys = ['1','2','3','4','5','6','7','8','9','.','0','←'];

export default function AmountPad() {
  const { transaction, setTransaction } = useExpenseContext();
  const amount = transaction.amount;

  const handlePress = (key) => {
    if (key === '←') {
      setTransaction((prev) => ({
        ...prev,
        amount: prev.amount.length > 1 ? prev.amount.slice(0, -1) : '0',
      }));
    } else {
      setTransaction((prev) => ({
        ...prev,
        amount:
          prev.amount === '0' && key !== '.'
            ? key
            : prev.amount + key,
      }));
    }
  };

  return (
    <View className="mt-6 p-3 bg-white  rounded-xl     mx-2">
      <Text className="text-center text-4xl text-blue  py-3 rounded-md border-blue/50 border-2 font-bold mb-4">{amount}</Text>
      <View className="flex-wrap flex-row justify-center">
        {padKeys.map((key, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(key)}
            className="w-[30%] m-[1.5%] p-4 bg-white    -blue  rounded-xl items-center"
          >
            <Text className="text-2xl text-blue">{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}