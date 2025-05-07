// Header.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({ onSave }) {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between items-center mb-4">
      <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center space-x-1">
        <X color="#FFD700" />
        <Text className="text-yellow-400 text-lg font-bold">CANCEL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSave} className="flex-row items-center space-x-1">
        <Check color="#FFD700" />
        <Text className="text-yellow-400 text-lg font-bold">SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}
