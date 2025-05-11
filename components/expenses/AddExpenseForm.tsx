import { Box, Button, Input, InputField, Text, VStack } from '@gluestack-ui/themed';
import CategorySelect from './CategorySelect';

export default function AddExpenseForm() {
  return (
    <VStack space="md" className="bg-white p-4 rounded-2xl  ">
      <Text className="font-bold " fontSize={20} fontWeight={'$semibold'}>Add Expense</Text>

      <VStack>
        <Input>
          <InputField placeholder="$ 0.00" keyboardType="numeric" />
        </Input>
        <Box className="w-full mt-2">
          <CategorySelect />
        </Box>
      </VStack>

      <Input>
        <InputField placeholder="Add a note" />
      </Input>

      <Button backgroundColor='$blue100' className=" mt-2">
        <Text color='#3b82f6'>Add Expense</Text>
      </Button>
    </VStack>
  );
}