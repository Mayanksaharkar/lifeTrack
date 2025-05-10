import { Box, Pressable, Text } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { Check } from 'lucide-react-native';
import { useExpenseContext } from '../../context/ExpenseContext';

export default function ExpenseLayout() {
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
  const context = useExpenseContext();
  
  const handlePress = () => {
    console.log("Save button pressed");
    console.log("Context available:", !!context);
    console.log("handleSave available:", !!context.handleSave);
    context.handleSave();
  };

  return (
    <Pressable onPress={handlePress}>
      <Box flexDirection="row" marginRight={10}>
        <Check color={'#3b82f6'} />
        <Text fontWeight="$medium" color="$blue500">
          Save
        </Text>
      </Box>
    </Pressable>
  );
}
