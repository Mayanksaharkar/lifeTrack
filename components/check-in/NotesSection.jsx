// import {  } from '@gluestack-ui/themed';

import { Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image, TouchableOpacity,
  View
} from "react-native";
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
       <Text className=" mb-3" fontWeight={'$bold'} fontSize={'$lg'}>Notes</Text>
      <Textarea>
        <TextareaInput placeholder="Add notes about your day..." />
      </Textarea>
      <Text className=" mb-3" fontWeight={'$bold'} fontSize={'$lg'}>
        Add Image:
      </Text>

      <TouchableOpacity
        className="bg-blue py-2 px-4 rounded mb-4"
        onPress={pickImage}
      >
        <Text color={'$white'} className=" text-center">
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
