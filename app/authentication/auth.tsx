import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  LogIn,
  TrendingUp,
  UserRound,
} from "lucide-react-native";
import React, { useState } from "react";
const AuthScreen = () => {
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);

  return (
    <Box className="flex flex-col bg-gradient-to-b from-blue-50 to-gray-100  min-h-screen">
      <Center className="flex-1 px-6">
        <VStack className="w-full max-w-md space-y-10 py-12">
          <VStack className="items-center space-y-4">
            <Box className="bg-indigo-100 p-5 rounded-full shadow-lg">
              <TrendingUp color="#4F46E5" size={48} />
            </Box>
            <Heading className="text-3xl font-bold text-gray-800 text-center">
              Welcome to LifeTrack
            </Heading>
            <Text className="text-base text-gray-600 text-center leading-relaxed">
              Track, analyze, and improve your daily habits effortlessly.
            </Text>
          </VStack>

          <HStack className="justify-between w-full py-6 px-4">
            <VStack className="items-center space-y-3">
              <Box className="bg-blue-100 p-4 rounded-full shadow-md">
                <Calendar color="#3B82F6" size={28} />
              </Box>
              <Text className="text-sm font-medium text-gray-700 text-center">
                Daily Tracking
              </Text>
            </VStack>

            <VStack className="items-center space-y-3">
              <Box className="bg-green-100 p-4 rounded-full shadow-md">
                <BarChart2 color="#10B981" size={28} />
              </Box>
              <Text className="text-sm font-medium text-gray-700 text-center">
                Smart Analytics
              </Text>
            </VStack>

            <VStack className="items-center space-y-3">
              <Box className="bg-purple-100 p-4 rounded-full shadow-md">
                <TrendingUp color="#8B5CF6" size={28} />
              </Box>
              <Text className="text-sm font-medium text-gray-700 text-center">
                Goal Setting
              </Text>
            </VStack>
          </HStack>

          <VStack className="space-y-5 w-full mt-8">
            <Button
              className="px-6 py-4 w-full bg-indigo-600 rounded-lg shadow-md"
              onPress={() => router.push("/authentication/login")}
            >
              <HStack className="items-center justify-center space-x-3">
                <LogIn size={20} color="white" />
                <Text className="text-white font-semibold">
                  Login to Your Account
                </Text>
              </HStack>
            </Button>

            <Button
              className="px-6 py-4 w-full border-2 border-indigo-600 rounded-lg bg-white shadow-md"
              variant="outline"
              onPress={() => router.push("/authentication/register")}
            >
              <HStack className="items-center justify-center space-x-3">
                <UserRound size={20} color="#4F46E5" />
                <Text className="text-indigo-600 font-semibold">
                  Create an Account
                </Text>
                <ArrowRight size={16} color="#4F46E5" />
              </HStack>
            </Button>
          </VStack>

          <Text className="text-center text-sm text-gray-500 pt-8">
            Start tracking your life journey today.
          </Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default AuthScreen;
