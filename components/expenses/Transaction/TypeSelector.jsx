// EntryTypeSelector.jsx
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const types = ['INCOME', 'EXPENSE', 'TRANSFER'];

export default function TypeSelector({ selected, onSelect }) {
  return (
    <View className="flex-row justify-evenly space-x-4 border-b border-gray-700 py-2 ">
      {types.map((type) => (
        <TouchableOpacity key={type} onPress={() => onSelect(type)}>
          <Text className={`text-lg font-semibold ${selected === type ? 'text-blue ' : 'text-gray-500'}`}>
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
