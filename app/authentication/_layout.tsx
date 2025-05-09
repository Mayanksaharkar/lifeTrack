import { AuthProvider } from "@/context/AuthContext";
import { Box } from "@gluestack-ui/themed";
import { Stack } from "expo-router";
import { Activity } from "lucide-react-native";
import React from "react";
export default function AuthenticationLayout() {
  return (
    <AuthProvider>
        <Stack initialRouteName="auth">
          <Stack.Screen
            name="auth"
            options={{
              title: "lifeTrack",
              // headerShown: false,
              headerLeft: () => (
                <Box>
                  <Activity color="#4F46E5" size={24} />
                </Box>
              ),
            }}
            
          />
          <Stack.Screen
            name="login"
            options={{
              title: "Login",
              // headerShown: false,
            }}
          />
          <Stack.Screen
            name="register"
            options={{
              title: "Register",
              // headerShown: false,
            }}
          />
        </Stack>
    </AuthProvider>
  );
}
