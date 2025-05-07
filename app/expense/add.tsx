import { Box } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import AccSelector from '../../components/expenses/Transaction/AccSelector';
import AmountPad from '../../components/expenses/Transaction/AmountPad';
import CategorySelector from '../../components/expenses/Transaction/CategorySelector';
import DateTimeDisplay from '../../components/expenses/Transaction/DateTime';
import NotesInput from '../../components/expenses/Transaction/NoteInput';
import TypeSelector from '../../components/expenses/Transaction/TypeSelector';
import { useExpenseContext } from '../context/ExpenseContext';

export default function AddTransactionScreen() {
  const [entryType, setEntryType] = useState('EXPENSE');
  const [account, setAccount] = useState('');
  const [category, setCategory] = useState(null);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('0');
  const [dateTime, setDateTime] = useState({
    date: new Date().toISOString().split('T')[0], 
    time: new Date().toTimeString().split(':').slice(0, 2).join(':'),
  });

  const { setHandleSave } = useExpenseContext();

  const handleSave = () => {
    console.log({ entryType, account, category, notes, amount, dateTime });
    
  };

  useEffect(() => {
    setHandleSave(() => handleSave);
  }, [entryType, account, category, notes, amount, dateTime]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between p-4 mb-10">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box>
            <TypeSelector selected={entryType} onSelect={setEntryType} />
            <View className="flex-row justify-between mt-4">
              <AccSelector account={account} setAccount={setAccount} />
              <CategorySelector category={category} setCategory={setCategory} />
            </View>
            <NotesInput value={notes} onChange={setNotes} />
            <AmountPad amount={amount} setAmount={setAmount} />
          </Box>
        </ScrollView>
        <View>
          <DateTimeDisplay
            dateTime={dateTime}
            setDateTime={setDateTime} // Pass the setter function directly
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
