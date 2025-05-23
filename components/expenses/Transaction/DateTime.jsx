import { useExpenseContext } from "@/context/ExpenseContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Clock } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function DateTimeDisplay() {
  const { transaction, setTransaction } = useExpenseContext();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Defensive fallback for dateTime
  const dateTime = transaction.dateTime || {
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      const isoDate = selectedDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
      setTransaction((prev) => ({
        ...prev,
        dateTime: { ...dateTime, date: isoDate },
      }));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === "set" && selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      setTransaction((prev) => ({
        ...prev,
        dateTime: { ...dateTime, time: `${hours}:${minutes}` },
      }));
    }
    setShowTimePicker(false);
  };

  const getDateTimeValue = () => {
    const { date, time } = dateTime;
    if (date && time) {
      return new Date(`${date}T${time}:00`);
    } else if (date) {
      return new Date(`${date}T12:00:00`);
    } else {
      return new Date(); // Fallback to current date/time if none are selected
    }
  };

  return (
    <View className="flex-row justify-between mt-6 px-2">
      <Pressable
        className="flex-row items-center space-x-2 gap-1"
        onPress={() => setShowDatePicker(true)}
      >
        <Calendar color="#3b82f6" size={25} />
        <Text className="text-blue text-lg font-semibold">
          {dateTime.date || "Select date"}
        </Text>
      </Pressable>

      <Pressable
        className="flex-row items-center space-x-2 gap-1"
        onPress={() => setShowTimePicker(true)}
      >
        <Clock color="#3b82f6" size={25} />
        <Text className="text-blue text-lg font-semibold">
          {dateTime.time || "Select time"}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={getDateTimeValue()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={getDateTimeValue()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}
