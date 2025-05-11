import React from "react";
import { ScrollView, View } from "react-native";
import RecentTransactions from "../expenses/RecentTransactions";
import ActionButtons from "./ActionButtons";
import Header from "./Header";
import SummaryCard from "./SummaryCard";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-6">
          <View className="space-y-4">
            <View className=" ">
              <Header />
            </View>
            <SummaryCard />
            <ActionButtons />
          </View>

          <View>
            <RecentTransactions />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
