// AmountPad.jsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const padKeys = ['1','2','3','4','5','6','7','8','9','.','0','←'];

export default function AmountPad({ amount, setAmount }) {
  const handlePress = (key) => {
    if (key === '←') {
      setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
    } else {
      setAmount(amount === '0' && key !== '.' ? key : amount + key);
    }
  };

  return (
    <View className="mt-6 p-3 bg-white  rounded-xl shadow shadow-black mx-2">
      <Text className="text-center text-4xl text-blue  py-3 rounded-md border-blue/50 border-2 font-bold mb-4">{amount}</Text>
      <View className="flex-wrap flex-row justify-center">
        {padKeys.map((key, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(key)}
            className="w-[30%] m-[1.5%] p-4 bg-white shadow shadow-blue  rounded-xl items-center"
          >
            <Text className="text-2xl text-blue">{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
