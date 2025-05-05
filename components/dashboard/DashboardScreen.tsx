import React from 'react';
import { ScrollView, View } from 'react-native';
import ActionButtons from './ActionButtons';
import Header from "./Header";
import RecentActivity from './RecentActivity';
import SummaryCard from './SummaryCard';

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-6">
          {/* Top Section */}
          <View className="space-y-4">
            <View className='shadow-black'>
              <Header />
            </View>
            <SummaryCard />
            <ActionButtons />
          </View>

          {/* Recent Activity Section */}
          <View>
            <RecentActivity />
          </View>
        </View>
      </ScrollView>
    </View>
    // <View >
    //   <Text className='text-4xl text-red-700'>Hello</Text>
    //   {/* <Header/> */}
    //   <RecentActivity/>
    // </View>

  );
}
