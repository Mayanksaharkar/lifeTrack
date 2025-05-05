import ActionButtons from '@/components/dashboard/ActionButtons';
import Header from '@/components/dashboard/Header';
import RecentActivity from '@/components/dashboard/RecentActivity';
import SummaryCard from '@/components/dashboard/SummaryCard';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
  return (
    // <StyledProvider config={{ ...UIConfig, colorMode: 'dark' }}>
      <View className="flex-1 bg-white">
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 0 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="space-y-6">
                {/* Top Section */}
                <View className="space-y-4">
                  <View className='drop-shadow-xl'>
                    <Header />
                  </View>
                  <SummaryCard />
                  <ActionButtons />
                </View>
      
                <View>
                  <RecentActivity />
                </View>
              </View>
            </ScrollView>
          </View>
    // </StyledProvider>
  );
}