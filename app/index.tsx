import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";

export default function Index() {
  const { isLoggedIn } = useAuth();

  return <Redirect href={isLoggedIn ? "/(tabs)/home" : "/authentication"} />;
}
