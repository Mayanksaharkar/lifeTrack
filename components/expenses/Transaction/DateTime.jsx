import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function DateTimeDisplay({ dateTime, setDateTime }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      const isoDate = selectedDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      setDateTime((prev) => ({ ...prev, date: isoDate }));
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'set' && selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setDateTime((prev) => ({ ...prev, time: `${hours}:${minutes}` }));
    }
    setShowTimePicker(false);
  };

  // Helper to create a Date object from date and time strings
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
          {dateTime.date || 'Select date'}
        </Text>
      </Pressable>

      <Pressable
        className="flex-row items-center space-x-2 gap-1"
        onPress={() => setShowTimePicker(true)}
      >
        <Clock color="#3b82f6" size={25} />
        <Text className="text-blue text-lg font-semibold">
          {dateTime.time || 'Select time'}
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
