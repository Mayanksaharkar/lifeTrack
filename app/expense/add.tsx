import { Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import AccSelector from '../../components/expenses/Transaction/AccSelector';
import AmountPad from '../../components/expenses/Transaction/AmountPad';
import CategorySelector from '../../components/expenses/Transaction/CategorySelector';
import DateTimeDisplay from '../../components/expenses/Transaction/DateTime';
import NotesInput from '../../components/expenses/Transaction/NoteInput';
import TypeSelector from '../../components/expenses/Transaction/TypeSelector';
import { ExpenseProvider } from '../context/ExpenseContext';

export default function AddTransactionScreen() {
 

  return (
    <ExpenseProvider>
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between p-4 mb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <TypeSelector  />
            <View className="flex-row justify-between mt-4">
              <AccSelector  />
              <CategorySelector />
            </View>
            <NotesInput />
            <AmountPad  />
          </Box>
        </ScrollView>
        <View>
          <DateTimeDisplay/>
        </View>
      </View>
    </SafeAreaView>
    </ExpenseProvider>
  );
}
