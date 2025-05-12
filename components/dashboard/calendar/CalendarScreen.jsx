import { useCheckIn } from "@/context/CheckInContext";
import { Feather } from "@expo/vector-icons";
import { Box, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Modal as RNModal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../../context/AuthContext";

const CalendarScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTags, setModalTags] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { checkInDisplay, fetchCheckIns, setCheckInDate } = useCheckIn();

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      // Make sure fetchCheckIns returns a Promise
      if (user) {
        await fetchCheckIns(user);
      }
    } catch (error) {
      console.error("Error refreshing check-ins:", error);
      Alert.alert("Error", "Failed to refresh. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [user, fetchCheckIns]);

  const formatDate = (date) => {
    if (!date) return "";
    if (typeof date === "string") return date.split("T")[0];
    if (date instanceof Date) return date.toISOString().split("T")[0];
    if (date.toDate) return date.toDate().toISOString().split("T")[0];
    return "";
  };

  useEffect(() => {
    // Initial fetch of check-ins only when component mounts
    // Using a separate function here to avoid calling handleRefresh
    const initialFetch = async () => {
      try {
        setRefreshing(true);
        if (user) {
          await fetchCheckIns(user);
        }
      } catch (error) {
        console.error("Error loading initial check-ins:", error);
      } finally {
        setRefreshing(false);
      }
    };

    initialFetch();
    // Empty dependency array ensures this only runs once when component mounts
  }, []);

  useEffect(() => {
    if (checkInDisplay.length > 0) {
      const firstCheckInDate = formatDate(checkInDisplay[0].checkInDate);
      setCurrentMonth(formatMonthYear(firstCheckInDate));
    } else {
      setCurrentMonth(formatMonthYear(todayString));
    }
  }, [checkInDisplay, todayString]);

  const markedDates = useMemo(() => {
    const marked = {};
    checkInDisplay.forEach((item) => {
      const dateStr = formatDate(item.checkInDate);
      if (dateStr) {
        marked[dateStr] = {
          startingDay: true,
          endingDay: true,
          color: "#3b82f6",
          textColor: "#ffffff",
        };
      }
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
  }, [checkInDisplay, selectedDate]);

  const formatMonthYear = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleString("default", {
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
    const match = checkInDisplay.find(
      (item) => formatDate(item.checkInDate) === day.dateString
    );
    if (match) {
      setModalTags([
        ...(match.grids?.emotions || []),
        ...(match.grids?.meals || []),
        ...(match.grids?.other || []),
        ...(match.grids?.people || []),
        ...(match.grids?.selfCare || []),
        ...(match.grids?.weather || []),
      ]);
      setModalVisible(true);
    } else {
      setCheckInDate(day.dateString);
      navigation.navigate("check-in");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <Box className="p-4">
          <View className="bg-white rounded-2xl overflow-hidden">
            <View className="flex-row justify-between items-center px-4 py-3 bg-blue-50  border-b-2 border-blue">
              <Text
                className="text-lg font-semibold "
                fontWeight={"$black"}
                color="$blue500"
              >
                {currentMonth}
              </Text>
              <TouchableOpacity
                onPress={handleRefresh}
                disabled={refreshing}
                className={`w-8 h-8 rounded-full ${
                  refreshing ? "bg-blue-300" : "bg-blue-500"
                } flex items-center justify-center`}
                activeOpacity={0.7}
              >
                {refreshing ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Feather name="refresh-cw" size={16} color="#3b82f6" />
                )}
              </TouchableOpacity>
            </View>

            {refreshing && (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: 10,
                  backgroundColor: "rgba(255,255,255,0.7)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#3b82f6" />
              </View>
            )}
            <Calendar
              markingType="period"
              markedDates={markedDates}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#3b82f6",
                todayTextColor: "#3b82f6",
                todayBackgroundColor: "#e0f2fe",
                dayTextColor: "#000000",
                textDisabledColor: "#94A3B8",
                arrowColor: "#3b82f6",
                textDayFontSize: 16,
                monthTextColor: "#3b82f6",
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
      </ScrollView>
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
            {modalTags.length > 0 ? (
              modalTags.map((tag, idx) => (
                <Text key={idx} className="text-blue-500">
                  • {tag}
                </Text>
              ))
            ) : (
              <Text className="text-gray-500">No tags available</Text>
            )}
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
