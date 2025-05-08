import React from "react";
import { ScrollView, View } from "react-native";
import ActionButtons from "../../components/dashboard/ActionButtons";
import CalendarScreen from "../../components/dashboard/calendar/CalendarScreen";
import SummaryCard from "../../components/dashboard/SummaryCard";
import RecentTransactions from "../../components/expenses/RecentTransactions";
export default function HomeScreen() {
  return (
    // <StyledProvider config={{ ...UIConfig, colorMode: 'dark' }}>
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <CalendarScreen />
        <View className="px-4">
          <RecentTransactions />
        </View>
      </ScrollView>
    </View>
    // </StyledProvider>
  );
}
