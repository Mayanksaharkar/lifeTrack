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
  TouchableWithoutFeedback,
  View,
  Animated,
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

  // Animation values for modal
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
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
  }, []);

  useEffect(() => {
    if (checkInDisplay.length > 0) {
      const firstCheckInDate = formatDate(checkInDisplay[0].checkInDate);
      setCurrentMonth(formatMonthYear(firstCheckInDate));
    } else {
      setCurrentMonth(formatMonthYear(todayString));
    }
  }, [checkInDisplay, todayString]);

  // Modal animation effect
  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animations when modal is hidden
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
    }
  }, [modalVisible]);

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

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

  // Format the date for display in a more readable way
  const getFormattedDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

      {/* Enhanced Fancy Modal */}
      <RNModal
        animationType="none" // We'll handle animations ourselves
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                opacity: fadeAnim,
              },
            ]}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <Animated.View
                className="bg-white rounded-2xl overflow-hidden w-full max-w-md "
                style={{
                  transform: [{ scale: scaleAnim }],
                }}
              >
                {/* Modal Header with Gradient */}
                <View className="px-6 py-4 flex-row justify-between items-center bg-blue-600">
                  <Text className="text-white text-xl font-bold">
                    {getFormattedDisplayDate(selectedDate)}
                  </Text>
                  <TouchableOpacity
                    className="bg-white/20 rounded-full p-1"
                    onPress={closeModal}
                  >
                    <Feather name="x" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                {/* Modal Content */}
                <View className="p-6">
                  <View className="flex-row items-center mb-4">
                    <Feather
                      name="tag"
                      size={20}
                      color="#3b82f6"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-lg font-semibold text-gray-800">
                      Tags
                    </Text>
                  </View>

                  {modalTags.length > 0 ? (
                    <View className="flex-row flex-wrap mb-6">
                      {modalTags.map((tag, idx) => (
                        <View
                          key={idx}
                          className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                        >
                          <Text className="text-blue-700">{tag}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text className="text-gray-500 italic mb-6">
                      No tags available
                    </Text>
                  )}

                  <Pressable
                    className="bg-blue-500 py-3 rounded-xl "
                    style={{
                      backgroundColor: "#3b82f6",
                    }}
                    onPress={closeModal}
                  >
                    <Text className="text-white text-center font-bold">
                      Close
                    </Text>
                  </Pressable>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </RNModal>
    </SafeAreaView>
  );
};

export default CalendarScreen;
