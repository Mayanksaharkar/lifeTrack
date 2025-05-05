import Grids from '@/components/check-in/Grids';
import React from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/check-in/Header';
import MoodSelector from '../../components/check-in/MoodSelector';
import NotesSection from '../../components/check-in/NotesSection';
import SaveButton from '../../components/check-in/SaveButton';
export default function CheckIn() {
  return (
    <View className="flex-1 bg-slate-100">
      <View className="flex-1">
        <Header />
        <ScrollView className='flex-1'>
        <MoodSelector />
        <Grids/>
        <NotesSection />
        <SaveButton />
        </ScrollView>
      </View>
    </View>
  );
}
