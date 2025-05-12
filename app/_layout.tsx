import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CheckInProvider } from "@/context/CheckInContext";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { StyledProvider } from "@gluestack-style/react";
import { config as UIConfig } from "@gluestack-ui/config";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "./globals.css";
export default function RootLayout() {
  return (
    <AuthProvider>
      <CheckInProvider>
        <ExpenseProvider>
          <RootNavigator />
        </ExpenseProvider>
      </CheckInProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect to authentication screen if not logged in
  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      router.replace("/authentication");
    }
  }, [isLoggedIn]);
  return (
    <StyledProvider config={{ ...UIConfig, colorMode: "light" }}>
      <OverlayProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />

          <Stack.Screen name="authentication" />

          <Stack.Screen name="+not-found" />
        </Stack>
      </OverlayProvider>
    </StyledProvider>
  );
}
