import {
    Box,
    Button,
    Center,
    Heading,
    HStack,
    Icon
} from '@gluestack-ui/themed';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Get the first day of the month and total days in month
  const getMonthDetails = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth, year, month };
  }, []);

  // Change to previous month
  const handlePrevMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  }, []);

  // Change to next month
  const handleNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  }, []);

  // Select a date
  const handleSelectDate = useCallback((day) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  }, [currentDate]);

  // Get activity status for styling - here we use random for demo
  const getActivityStatus = (day) => {
    // For demonstration, returns one of: 'high', 'medium', 'low', or null
    if (day % 9 === 0) return 'high';
    if (day % 5 === 0) return 'medium';
    if (day % 3 === 0) return 'low';
    return null;
  };

  // Check if a date is today
  const isToday = useCallback((day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  }, [currentDate]);

  // Check if a date is selected
  const isSelected = useCallback((day) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  }, [selectedDate, currentDate]);

  // Render calendar grid
  const renderCalendarDays = useCallback(() => {
    const { firstDay, daysInMonth } = getMonthDetails(currentDate);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} className="w-10 h-10 m-1" />
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const activityStatus = getActivityStatus(day);
      
      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          onPress={() => handleSelectDate(day)}
          className={`w-10 h-10 rounded-full m-1 justify-center items-center
            ${isSelected(day) ? 'border-2 border-green-500' : ''}
            ${isToday(day) ? 'bg-gray-700' : ''}`}
        >
          <View className={`w-full h-full rounded-full justify-center items-center overflow-hidden
            ${activityStatus === 'high' ? 'bg-yellow-400' : ''}
            ${activityStatus === 'medium' ? 'bg-green-400' : ''}
            ${activityStatus === 'low' ? 'bg-green-600' : ''}
            ${isSelected(day) && !activityStatus ? 'bg-green-500' : ''}`}
          >
            <Text 
              className={`text-center font-medium
                ${activityStatus ? 'text-black' : 'text-white'}`}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    
    return days;
  }, [currentDate, selectedDate, getMonthDetails, handleSelectDate, isSelected, isToday]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Box className="p-4">
        {/* Header with month selector and share button */}
        <HStack className="justify-between items-center mb-6">
          <HStack className="items-center space-x-2">
            <Heading className="text-white text-2xl font-bold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Heading>
            <Icon as={ChevronDown} color="white" size="md" />
          </HStack>
          <TouchableOpacity className="w-8 h-8 justify-center items-center">
            <Icon as={Share2} color="white" size="sm" />
          </TouchableOpacity>
        </HStack>

        {/* Weekday headers */}
        <HStack className="justify-between mb-4">
          {WEEKDAYS.map(day => (
            <Center key={day} className="w-10 py-2">
              <Text className="text-gray-400 text-sm">{day}</Text>
            </Center>
          ))}
        </HStack>

        {/* Month navigation buttons */}
        <HStack className="justify-between absolute top-4 left-4 right-4 z-10 opacity-0">
          <Button 
            onPress={handlePrevMonth}
            className="bg-transparent"
          >
            <Icon as={ChevronLeft} color="white" size="md" />
          </Button>
          <Button 
            onPress={handleNextMonth}
            className="bg-transparent"
          >
            <Icon as={ChevronRight} color="white" size="md" />
          </Button>
        </HStack>

        {/* Calendar grid */}
        <View className="flex flex-row flex-wrap justify-between">
          {renderCalendarDays()}
        </View>
      </Box>
    </SafeAreaView>
  );
};

// Utility components
const ChevronDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
};

// Adding styles for platforms that may not fully support className
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});

export default CalendarComponent;