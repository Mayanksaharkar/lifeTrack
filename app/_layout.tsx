import { useColorScheme } from "@/hooks/useColorScheme";
import { StyledProvider } from "@gluestack-style/react";
import { config as UIConfig } from "@gluestack-ui/config";
import { OverlayProvider } from "@gluestack-ui/overlay";
import {
  DarkTheme,
  DefaultTheme
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./globals.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <StyledProvider config={{ ...UIConfig, colorMode: "light" }}>
      <OverlayProvider>
        <Stack initialRouteName="authentication">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="expense" options={{ headerShown: false }} />
          <Stack.Screen
            name="authentication"
            options={{ headerShown: false }}
          />
        </Stack>
        <StatusBar style="auto" />
      </OverlayProvider>
    </StyledProvider>
  );
}
