import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';

import { StyledProvider } from '@gluestack-style/react';
import { config as UIConfig } from '@gluestack-ui/config';
import { ChartArea, Home, LogIn, Wallet } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';
// Set the initial route name in the Tabs component
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <StyledProvider config={{ ...UIConfig, colorMode: 'light' }}>
    <Tabs
      initialRouteName="check-in"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', 
          },
          default: {},
          
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home  />,
        }}
      />
      <Tabs.Screen
        name="check-in"
        options={{
          title: 'Check-In',
          tabBarIcon: ({ color }) => <LogIn />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }) => <Wallet  />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => <ChartArea   />,
        }}
      />
    </Tabs>
    </StyledProvider>
  );
}