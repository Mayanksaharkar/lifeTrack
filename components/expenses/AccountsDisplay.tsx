import { Text, VStack } from "@gluestack-ui/themed";
import {
  CreditCard,
  IndianRupee,
  PiggyBank
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import AccountCard from "./Accounts/AccountCard";
import AddAccButton from "./Accounts/AddAccButton";
export default function AccountsDisplay() {
  const Accounts = [
    { name: "Card", balance: 0, icon: CreditCard },
    { name: "Cash", balance: 0, icon: IndianRupee },
    {
      name: "Saving",
      balance: 0,
      icon: PiggyBank,
    }

  ];
  const  [accounts , setAccount] = useState(Accounts); 

  const handleAccountAdd = (newAccount) => {
    setAccount((prevAccounts) => [...prevAccounts, newAccount]);
  }

  return (
    <ScrollView className="bg-white shadow-black shadow  rounded-2xl mb-10 flex-1 px-4 py-6">
      <VStack space="md">
        <Text className="text-lg mb-2" color={"$black"} fontWeight={"$bold"}>Accounts</Text>

        {accounts.map((account) => (
          <AccountCard
            key={account.name}
            icon={account.icon}
            title={account.name}
            balance={account.balance.toString()}
            iconBgColor="bg-blue"
          />
        ))}
        <AddAccButton handleAccountAdd = {handleAccountAdd} />
      </VStack>
    </ScrollView>
  );
}
