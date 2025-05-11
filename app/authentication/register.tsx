import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputField,
  InputIcon,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";

export default function RegisterScreen() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { handleRegister } = useAuth();

  return (
    <Center
      flex={1}
      className="bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4"
    >
      <Box className="px-6 py-8 bg-white rounded-3xl w-full max-w-md shadow-2xl">
        <VStack space="lg">
          <Heading size="xl" className="text-center text-blue-700 mb-2">
            Create Account
          </Heading>

          <Input className="border border-blue-300 rounded-2xl bg-blue-50 items-center pl-4">
            <InputIcon as={User} color="$blue500" />
            <InputField
              placeholder="Full Name"
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              className="px-3 py-2 text-blue-900"
            />
          </Input>

          <Input className="border border-blue-300 rounded-2xl bg-blue-50 items-center pl-4">
            <InputIcon as={Mail} color="$blue500" />
            <InputField
              placeholder="Email Address"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              className="px-3 py-2 text-blue-900"
            />
          </Input>

          <Input className="border border-blue-300 rounded-2xl bg-blue-50 items-center pl-4">
            <InputIcon as={Lock} color="$blue500" />
            <InputField
              placeholder="Password"
              secureTextEntry
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
              className="px-3 py-2 text-blue-900"
            />
          </Input>

          <Button
            onPress={() => handleRegister(user)}
            className="bg-blue-600 rounded-2xl py-3 justify-center shadow-md"
            size="lg"
          >
            <Text
              className="text-white text-center font-semibold text-base"
              color="$white"
            >
              Sign Up
            </Text>
          </Button>

          <Text
            className="text-center text-gray text-sm mt-2"
            onPress={() => router.push("/authentication/login")}
          >
            Already have an account?{" "}
            <Text className="text-blue-600 font-medium">Login</Text>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}
