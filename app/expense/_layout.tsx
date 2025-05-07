import { Stack } from 'expo-router';
import { useState } from 'react';
import  { useExpenseContext } from '../context/ExpenseContext'; // adjust if needed
import  ExpenseContext  from '../context/ExpenseContext'; // adjust if needed
import { Box, Text, Pressable } from '@gluestack-ui/themed';
import { Check } from 'lucide-react-native';

export default function ExpenseLayout() {
  const [handleSave, setHandleSave] = useState(() => () => {});

  return (
    <ExpenseContext.Provider value={{ handleSave, setHandleSave }}>
      <Stack>
        <Stack.Screen
          name="add"
          options={{
            title: 'Add Expense',
            headerRight: () => <SaveButton />,
          }}
        />
      </Stack>
    </ExpenseContext.Provider>
  );
}

function SaveButton() {
  const { handleSave } = useExpenseContext();

  return (
    <Pressable onPress={handleSave}>
      <Box flexDirection="row" marginRight={10}>
        <Check color={'#3b82f6'} />
        <Text fontWeight="$medium" color="$blue500">
          Save
        </Text>
      </Box>
    </Pressable>
  );
}
