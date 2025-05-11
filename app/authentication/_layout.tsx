import { Stack } from "expo-router";
import React from "react";
export default function AuthenticationLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right", // or 'fade', 'slide_from_bottom'
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: "lifeTrack", headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
