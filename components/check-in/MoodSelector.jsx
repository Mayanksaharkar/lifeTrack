import { Box, HStack, Pressable, Text } from "@gluestack-ui/themed";
import { Angry, Frown, Laugh, Meh, Smile } from "lucide-react-native";
import { useState } from "react";
import { useCheckIn } from "../../context/CheckInContext"
const moods = [
  { icon: Angry, label: "Awful" },
  { icon: Frown, label: "Bad" },
  { icon: Meh, label: "Okay" },
  { icon: Smile, label: "Good" },
  { icon: Laugh, label: "Great" },
];

export default function MoodSelector() {
  const {checkInData , setMood} = useCheckIn();
  const selected = checkInData.mood.index;
  return (
    <Box className="bg-white p-4 rounded-2xl mx-4 mb-2  mt-4">
      <Text className="text-lg font-semibold text-center mb-3">
        How was your day?
      </Text>
      <HStack justifyContent="space-around">
        {moods.map(({ icon: Icon, label }, index) => {
          const isActive = selected === index;
          return (
            <Pressable
              key={index}
              onPress={() => setMood(index, label)}
              padding={11}
              className="items-center"
              // backgroundColor={isActive ? "#3b82f6" : "#f3f4f6"}
              rounded={30}
             >
              <Icon color={isActive ? "#3b82f6" : "#6b7280"} size={32}  />
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
}
