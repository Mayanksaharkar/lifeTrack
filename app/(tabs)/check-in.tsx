import Grids from "@/components/check-in/Grids";
import React from "react";
import { ScrollView, View } from "react-native";
import MoodSelector from "../../components/check-in/MoodSelector";
import NotesSection from "../../components/check-in/NotesSection";
import SaveButton from "../../components/check-in/SaveButton";
import { CheckInProvider } from "@/context/CheckInContext";
import DatePicker from "@/components/check-in/DatePicker";
export default function CheckIn() {
  return (
    <View className="flex-1 bg-slate-100 ">
      <View className="flex-1">
        <DatePicker />
        <ScrollView className="flex-1 ">
          <MoodSelector />
          <Grids />
          <NotesSection />
          <SaveButton />
        </ScrollView>
      </View>
    </View>
  );
}
