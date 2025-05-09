import { useExpenseContext } from "@/context/ExpenseContext";
import { Text, VStack } from "@gluestack-ui/themed";
import { ScrollView } from "react-native";
import AccountCard from "./Accounts/AccountCard";
import AddAccButton from "./Accounts/AddAccButton";

export default function AccountsDisplay() {
 const {accounts,handleAccountAdd,handleEdit,handleDelete} = useExpenseContext();
  return (
    <ScrollView className="bg-white shadow-black shadow  rounded-2xl mb-10 flex-1 px-4 py-6">
      <VStack space="md">
        <Text className="text-lg mb-2" color={"$black"} fontWeight={"$bold"}>
          Accounts
        </Text>

        {accounts.map((account) => (
          <AccountCard
            key={account.name}
            icon={account.icon}
            title={account.name}
            balance={account.balance.toString()}
            onEdit={() => handleEdit(account.id)}
            onDelete={() => handleDelete(account.id)}
            
          />
        ))}
        <AddAccButton  />
      </VStack>
    </ScrollView>
  );
}
