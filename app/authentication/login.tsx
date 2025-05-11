import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputField,
  InputIcon,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import { Lock, Mail } from "lucide-react-native";

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
    <View flex={1} className=" h-screen justify-center items-center px-4">
      <Box className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl ">
        <Heading size="xl" className="text-center text-blue-700 mb-6">
          Login
        </Heading>

        <VStack space="lg">
          <FormControl>
            <Text className="mb-1 text-gray-700">Email</Text>
            <Input className="border border-blue-300 bg-blue-50 rounded-2xl items-center pl-4">
              <InputIcon as={Mail} color="$blue500" />
              <InputField
                className="px-3 py-2 text-blue-900"
                placeholder="Enter your email"
                value={user.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            </Input>
          </FormControl>

          <FormControl>
            <Text className="mb-1 text-gray-700">Password</Text>
            <Input className="border border-blue-300 bg-blue-50 rounded-2xl items-center pl-4">
              <InputIcon as={Lock} color="$blue500" />
              <InputField
                className="px-3 py-2 text-blue-900 pr-10"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={user.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <Pressable
                onPress={togglePasswordVisibility}
                style={{ position: "absolute", right: 10, top: 12 }}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#1D4ED8" />
                ) : (
                  <Eye size={20} color="#1D4ED8" />
                )}
              </Pressable>
            </Input>
          </FormControl>

          {error ? (
            <Text className="text-red-600 text-sm mt-1">{error}</Text>
          ) : null}

          <Button
            onPress={handleLoginPress}
            isDisabled={loading}
            className="mt-4 bg-blue-600 rounded-2xl py-3 shadow-md"
          >
            <Text
              className=" text-center font-semibold text-base"
              color="$white"
            >
              {loading ? "Logging In..." : "Login"}
            </Text>
          </Button>

          <Text className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <Text
              className="text-blue-600 font-bold"
              onPress={() => router.push("/authentication/register")}
            >
              Sign Up
            </Text>
          </Text>
        </VStack>
      </Box>
    </View>
  );
}
