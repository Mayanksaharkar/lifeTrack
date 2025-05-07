import { Divider, VStack } from '@gluestack-ui/themed';
import { Text } from 'react-native';
import TransactionItem from './TransactionItem';
export default function RecentTransactions() {
  return (
    <VStack space="sm" className="bg-white p-4 rounded-2xl shadow-md my-4">
      <Text className=" text-lg mb-2 font-bold" >Recent Transactions</Text>

      <TransactionItem account='Cash'  label="Coffee shop" date="Today, 9:15 AM" amount="50" />
      <Divider />
      <TransactionItem account='Bank 1'  label="Grocery store" date="Yesterday, 6:30 PM" amount="200" />
      <Divider />
      <TransactionItem account='Bank 2' label="Gas station" date="May 2, 4:15 PM" amount="165" />
    </VStack>
  );
}
