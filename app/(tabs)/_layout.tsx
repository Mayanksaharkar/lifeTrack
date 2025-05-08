import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyledProvider } from "@gluestack-style/react";
import { config as UIConfig } from "@gluestack-ui/config";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { Box } from "@gluestack-ui/themed";
import { Tabs } from "expo-router";
import {
  ChartArea,
  HomeIcon,
  LogIn,
  Sparkles,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <StyledProvider config={{ ...UIConfig, colorMode: "light" }}>
      <OverlayProvider>
        <Tabs
          initialRouteName="expenses"
          screenOptions={{
            tabBarActiveTintColor: "#3b82f6",
            headerShown: true,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                position: "absolute",
              },
              default: {},
            }),
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Dashboard",
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <HomeIcon color={color} stroke={"#3b82f6"} />
                ) : (
                  <HomeIcon color={color} />
                ),

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Tabs.Screen
            name="check-in"
            options={{
              title: "Check In",
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <LogIn color={color} stroke={"#3b82f6"} />
                ) : (
                  <LogIn color={color} />
                ),
              headerLeft: () => (
                <Box mx="$4" flexDirection="row" alignItems="center">
                  <Sparkles size={38} color="#3b82f6" />
                </Box>
              ),
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Tabs.Screen
            name="expenses"
            options={{
              title: "Expenses",
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <Wallet color={color} stroke={"#3b82f6"} />
                ) : (
                  <Wallet color={color} />
                ),

              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Tabs.Screen
            name="insights"
            options={{
              title: "Insights",
              tabBarIcon: ({ color, focused }) =>
                focused ? (
                  <ChartArea color={color} stroke={"#3b82f6"} />
                ) : (
                  <ChartArea color={color} />
                ),
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Tabs>
      </OverlayProvider>
    </StyledProvider>
  );
}
