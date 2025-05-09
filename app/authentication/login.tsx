import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Button,
  Center,
  EyeIcon, EyeOffIcon,
  FormControl,
  Heading,
  Input,
  InputField,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";

export default function LoginScreen() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, loading, error } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleLoginPress = async () => {
    await handleLogin(user);
  };

  return (
    <Center flex={1} px="$4">
      <Box
        bg="$white"
        p="$6"
        borderRadius="$md"
        shadow="$md"
        width="$full"
        maxWidth={360}
      >
        <Heading size="lg" mb="$4" textAlign="center">
          Login
        </Heading>
        <VStack space={3}>
          <FormControl>
            <Text>Email</Text>
            <Input>
              <InputField
                placeholder="Enter your email"
                value={user.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            </Input>
          </FormControl>
          <FormControl>
            <Text>Password</Text>
            <Input>
              <InputField
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={user.password}
                onChangeText={(text) => handleInputChange("password", text)}
              />
              <Button
                variant="unstyled"
                position="absolute"
                right="$2"
                top="$2"
                onPress={togglePasswordVisibility}
              >
                {showPassword ? <EyeOffIcon size="sm" /> : <EyeIcon size="sm" />}
              </Button>
            </Input>
          </FormControl>
          {error && (
            <Text color="$red700" mt="$2">
              {error}
            </Text>
          )}
          <Button
            onPress={handleLoginPress}
            isDisabled={loading}
            mt="$4"
          >
            <Text>{loading ? "Logging In..." : "Login"}</Text>
          </Button>
          <Text mt="$3" textAlign="center" color="$gray500">
            Don't have an account?{" "}
            <Text color="$primary500" fontWeight="$bold">
              Sign Up
            </Text>
          </Text>
        </VStack>
      </Box>
    </Center>
  );
}