// import {  } from '@gluestack-ui/themed';

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, 
    StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
export default function NotesSection() {
  const [file, setFile] = useState(null);

  
  const [error, setError] = useState(null);

  
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      setError("Sorry, we need camera roll permission to upload images.");
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images."
      );
      return; // stop here if permission denied
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.cancelled) {
      setFile(result.assets[0].uri); // updated: `assets` array in recent SDK
      setError(null);
    }
  };
  


  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">
        Add Image:
      </Text>

      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded mb-4"
        onPress={pickImage}
      >
        <Text className="text-white text-center">
          Choose Image
        </Text>
      </TouchableOpacity>

      {file ? (
        <View className="items-center">
          <Image
            source={{ uri: file }}
            className="w-40 h-40 rounded"
          />
        </View>
      ) : (
        <Text className="text-red-500 mt-4">{error}</Text>
      )}
    </View>
  );
}
