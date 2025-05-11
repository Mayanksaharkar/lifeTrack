import { useAuth } from "@/context/AuthContext";
import { Text, View } from "@gluestack-ui/themed";
import { router } from "expo-router";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  LogIn,
  TrendingUp,
  UserRound,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
const AuthScreen = () => {
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      // router.replace("/(tabs)");
      console.log("User is logged in, redirecting to home screen");
    }
  }, [isLoggedIn]);

  return (
    <View className="flex-1 items-center justify-center px-6 py-12">
      <View className="w-full max-w-md space-y-10 h-[60%]  justify-evenly">
        <View className="items-center space-y-4 ">
          <View className="bg-indigo-100 p-5 rounded-full ">
            <TrendingUp color="#3b82f6" size={48} />
          </View>
          <Text className="text-3xl font-bold text-gray-800 text-center">
            Welcome to LifeTrack
          </Text>
          <Text className="text-base text-gray-600 text-center leading-relaxed">
            Track, analyze, and improve your daily habits effortlessly.
          </Text>
        </View>

        <View className="flex-row justify-around w-full py-6 px-4 ">
          <View className="items-center space-y-3">
            <View className="bg-gray p-4 rounded-full  ">
              <Calendar color="#3B82F6" size={28} />
            </View>
            <Text className="text-sm font-medium text-gray-700 text-center"fontSize={13}>
              Daily Tracking
            </Text>
          </View>

          <View className="items-center space-y-3">
            <View className=" p-4 bg-gray rounded-full  ">
              <BarChart2 color="#3b82f6" size={28} />
            </View>
            <Text className=" font-medium text-gray-700 text-center" fontSize={13}>
              Smart Analytics
            </Text>
          </View>

          <View className="items-center space-y-3">
            <View className=" p-4 bg-gray rounded-full  ">
              <TrendingUp color="#3b82f6" size={28} />
            </View>
            <Text className="text-sm font-medium text-gray-700 text-center"fontSize={13}>
              Goal Setting
            </Text>
          </View>
        </View>

        <View className="space-y-5 w-full mt-8 gap-6">
          <TouchableOpacity
            className="px-6 py-4 w-full bg-blue rounded-lg  "
            onPress={() => router.push("/authentication/login")}
          >
            <View className="flex-row items-center justify-center space-x-3">
              <LogIn size={20} color="white" />
              <Text className="text-white font-semibold" color="white">
                Login to Your Account
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="px-6 py-4 w-full border-2 border-blue rounded-lg bg-white  "
            onPress={() => router.push("/authentication/register")}
          >
            <View className="flex-row items-center justify-center space-x-3">
              <UserRound size={20} color="#4F46E5" />
              <Text className="text-blue font-semibold">Create an Account</Text>
              <ArrowRight size={16} color="#4F46E5" />
            </View>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-sm text-gray-500 pt-8">
          Start tracking your life journey today.
        </Text>
      </View>
    </View>
  );
};

export default AuthScreen;
