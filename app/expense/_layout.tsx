import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useState } from 'react';
import { useExpenseContext } from '../../context/ExpenseContext';

export default function ExpenseLayout() {
  const [expenseState, setExpenseState] = useState({
    handleSave: () => {
      // Default save handler logic
    },
  });

  return (
  
      <Stack>
        <Stack.Screen
          name="add"
          options={{
            title: 'Add Expense',
            headerRight: () => <SaveButton />,
          }}
        />
      </Stack>
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
