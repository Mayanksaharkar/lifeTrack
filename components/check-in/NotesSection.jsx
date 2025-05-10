import { Text, Textarea, TextareaInput } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ActivityIndicator, Alert, Image, TouchableOpacity, View } from "react-native";
import { useCheckIn } from '../../context/CheckInContext';

export default function NotesSection() {
  const { checkInData, setNotes, setImageUri, isSubmitting } = useCheckIn();
  
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images."
      );
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['image'],
      allowsEditing: true,
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
    });
  
    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1 p-4">
      <Text className="mb-3" fontWeight={'$bold'} fontSize={'$lg'}>Notes</Text>
      <Textarea>
        <TextareaInput 
          placeholder="Add notes about your day..." 
          value={checkInData.notes}
          onChangeText={setNotes}
        />
      </Textarea>
      <Text className="mb-3" fontWeight={'$bold'} fontSize={'$lg'}>
        Add Image:
      </Text>

      <TouchableOpacity
        className="bg-blue py-2 px-4 rounded mb-4"
        onPress={pickImage}
        disabled={isSubmitting}
      >
        <Text color={'$white'} className="text-center">
          {isSubmitting ? 'Uploading...' : 'Choose Image'}
        </Text>
      </TouchableOpacity>

      {isSubmitting && (
        <View className="items-center my-2">
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      )}

      {checkInData.imageUri && (
        <View className="items-center">
          <Image
            source={{ uri: checkInData.imageUri }}
            className="w-40 h-40 rounded"
          />
        </View>
      )}
    </View>
  );
}