import { AuthProvider } from "@/context/AuthContext";
import { StyledProvider } from "@gluestack-style/react";
import { config as UIConfig } from "@gluestack-ui/config";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { Stack } from "expo-router";
import "./globals.css";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
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
