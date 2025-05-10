import {
  Box,
  Button,
  Input,
  InputField,
  InputIcon,
  Text,
  VStack,
  Center,
} from "@gluestack-ui/themed";
import { Lock, Mail, User } from "lucide-react-native";
import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { handleRegister } = useAuth();

  return (
    <Center flex={1} className="px-4 bg-white">
      <Box className="px-6 py-6 bg-white rounded-2xl shadow-md w-[90%] self-center mt-10">
        <VStack space="lg">
          <Input className="border border-gray-300 rounded-xl">
            <InputIcon as={User} />
            <InputField
              placeholder="Name"
              value={user.name}
              onChangeText={(text) => setUser({ ...user, name: text })}
              className="px-3 py-2"
            />
          </Input>

          <Input className="border border-gray-300 rounded-xl">
            <InputIcon as={Mail} />
            <InputField
              placeholder="Email"
              keyboardType="email-address"
              value={user.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
              className="px-3 py-2"
            />
          </Input>

          <Input className="border border-gray-300 rounded-xl">
            <InputIcon as={Lock} />
            <InputField
              placeholder="Password"
              secureTextEntry
              value={user.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
              className="px-3 py-2"
            />
          </Input>

          <Button
            onPress={() => handleRegister(user)}
            className="bg-blue-600 rounded-xl py-3 justify-center"
          >
            <Text className="text-white text-center font-semibold text-base">
              Register
            </Text>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
