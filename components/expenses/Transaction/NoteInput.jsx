import { Pencil } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

export default function NoteInput({ value, onChange }) {
  return (
    <View className="flex-row items-center  rounded-lg bg-gray px-3 py-2 mt-4">
      <Pencil color="#3b82f6" size={20} />
      <TextInput
        className="ml-2 flex-1 text-blue"
        placeholder="Add notes"
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
