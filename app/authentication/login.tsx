import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
export default function LoginScreen() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isLoggedIn, error, loading } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleLoginPress = async () => {
    await handleLogin(user);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/(tabs)/home");
    }
  }, [isLoggedIn]);

  return (
    <Center flex={1} className="px-4 bg-white">
      <Box className="bg-white p-6 rounded-2xl   w-full max-w-sm">
        <Heading size="lg" className="text-center mb-4">
          Login
        </Heading>

        <VStack space="md">
          <FormControl>
            <Text className="mb-1 text-gray-700">Email</Text>
            <Input className="border border-gray-300 rounded-md">
              <InputField
                className="px-3 py-2"
                placeholder="Enter your email"
                value={user.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            </Input>
          </FormControl>

          <FormControl>
            <Text className="mb-1 text-gray-700">Password</Text>
            <Input className="border border-gray-300 rounded-md">
              <InputField
                className="px-3 py-2 pr-10"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={user.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Pressable>
            </Input>
          </FormControl>

          {error && <Text className="text-red-600 mt-1">{error}</Text>}

          <Button
            onPress={handleLoginPress}
            isDisabled={loading}
            className="mt-4 bg-blue-600 rounded-md"
          >
            <Text className="text-white text-center w-full">
              {loading ? "Logging In..." : "Login"}
            </Text>
          </Button>

          <Text className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <Text
              className="text-blue-600 font-bold"
              onPress={() => {
                router.push("/authentication/register");
              }}
            >
              Sign Up
            </Text>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
