import { useCheckIn } from "@/context/CheckInContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";

export default function DatePicker() {
  const [show, setShow] = useState(false);
  const [localDate, setLocalDate] = useState(null); // Local date
  const { checkInData, setCheckInDate, checkInDisplay, deleteCheckIn } =
    useCheckIn();

  const isSameDay = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const onChange = (_, selectedDate) => {
    setShow(false);
    if (!selectedDate) return;

    const existing = checkInDisplay.find((item) =>
      isSameDay(new Date(item.checkInDate), new Date(selectedDate))
    );
    console.log("Existing check-in:", existing);

    if (existing) {
      // Show alert with Overwrite and Keep options
      Alert.alert(
        "Date already exists",
        "A check-in already exists for this date. What would you like to do?",
        [
          {
            text: "Overwrite",
            style: "destructive",
            onPress: async () => {
              await deleteCheckIn(existing.id);
              setLocalDate(selectedDate);

              setCheckInDate(
                new Date(selectedDate).toISOString().split("T")[0]
              );
              router.push("/home");
            },
          },
          {
            text: "Keep",
            style: "default",
            onPress: () => {
              router.push("/home");
            },
          },
          { text: "Cancel", style: "cancel" },
        ]
      );

      return;
    }

    setLocalDate(selectedDate);
    console.log(
      "Selected date:",
      new Date(selectedDate).toISOString().split("T")[0]
    );
    setCheckInDate(selectedDate);
  };

  return (
    <View className="items-center my-4">
      <Pressable
        onPress={() => setShow(true)}
        className="bg-white px-4 py-2 rounded-lg border border-blue-200"
      >
        <Text className="text-blue-600 font-semibold">
          {checkInData.checkInDate
            ? new Date(checkInData.checkInDate).toLocaleDateString()
            : "Select a date"}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={
            checkInData.checkInDate
              ? new Date(checkInData.checkInDate)
              : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
}
