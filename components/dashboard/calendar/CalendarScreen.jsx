import { Box, HStack, Heading, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Modal as RNModal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTags, setModalTags] = useState([]);

  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

  // Example data
  const moodData = [
    { date: "2025-05-07", tags: ["happy", "grateful", "work"] },
    { date: "2025-05-03", tags: ["sad", "tired"] },
  ];

  // Build markedDates
  const getMarkedDates = () => {
    const marked = {};
  
    moodData.forEach((item) => {
      marked[item.date] = {
        startingDay: true,
        endingDay: true,
        color: "#3b82f6",
        textColor: "#ffffff",
      };
    });
  
    if (selectedDate && !marked[selectedDate]) {
      marked[selectedDate] = {
        startingDay: true,
        endingDay: true,
        color: "#3b82f6",
        textColor: "#ffffff",
      };
    }
  
    return marked;
  };
  

  const formatMonthYear = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const formatfDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("default", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(formatMonthYear(month.dateString));
  };

  const handleDayPress = (day) => {
    if (day.dateString > todayString) {
      Alert.alert("Invalid", "You cannot select a future date.");
      return;
    }

    setSelectedDate(day.dateString);
    const match = moodData.find((item) => item.date === day.dateString);

    if (match) {
      setModalTags(match.tags);
      setModalVisible(true);
    } else {
      navigation.navigate("check-in");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <Box className="p-4">
        <HStack className="flex-row items-center mb-4">
          <Heading
            className="  text-2xl mr-2"
            fontSize={20}
            color="gray"
            fontWeight="light"
          >
            {currentMonth || formatfDate(new Date())}
          </Heading>
          <TouchableOpacity>
            <ChevronDown stroke="#fff" width={24} height={24} />
          </TouchableOpacity>
        </HStack>

        <View className="bg-white rounded-2xl   overflow-hidden">
          <Calendar
            markingType="period"
            markedDates={getMarkedDates()}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#3b82f6",
              selectedDayBackgroundColor: "#3b82f6",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#3b82f6",
              todayBackgroundColor: "#e0f2fe",
              todayButtonFontWeight: "condensedBold",
              dayTextColor: "#000000",
              textDisabledColor: "#94A3B8",
              arrowColor: "#3b82f6",
              monthTextColor: "#3b82f6",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            }}
            onDayPress={handleDayPress}
            onMonthChange={handleMonthChange}
            enableSwipeMonths={true}
            hideExtraDays={true}
            maxDate={todayString}
          />
        </View>
      </Box>

      {/* Modal to show tags */}
      <RNModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-xl p-6 w-full max-w-md">
            <Text className="text-lg font-bold mb-2">{selectedDate}</Text>
            <Text className="mb-2">Tags:</Text>
            {modalTags.map((tag, idx) => (
              <Text key={idx} className="text-blue-500">
                • {tag}
              </Text>
            ))}

            <Pressable
              className="mt-4 bg-blue-500 p-2 rounded"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Close</Text>
            </Pressable>
          </View>
        </View>
      </RNModal>
    </SafeAreaView>
  );
};

export default CalendarScreen;
