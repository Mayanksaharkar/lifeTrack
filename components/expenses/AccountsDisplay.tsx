import { useExpenseContext } from "@/context/ExpenseContext";
import { Spinner, Text, VStack } from "@gluestack-ui/themed";
import { RefreshCw } from "lucide-react-native";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AccountCard from "./Accounts/AccountCard";
import AddAccButton from "./Accounts/AddAccButton";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
export default function AccountsDisplay() {
  const [refreshing, setRefreshing] = useState(false);

  const { accounts, handleEdit, handleDelete, fetchAccounts } =
    useExpenseContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      setRefreshing(true);
      fetchAccounts(user.uid)
        .then(() => {
          setRefreshing(false);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          setRefreshing(false);
        });
    }
  }, []);
  // Manual refresh handler (e.g., for a button)
  const handleRefresh = () => {
    if (user && user.uid) {
      setRefreshing(true);
      fetchAccounts(user.uid)
        .then(() => {
          setRefreshing(false);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          setRefreshing(false);
        });
    } else {
      setRefreshing(false);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="bg-white rounded-2xl mb-10 flex-1 px-4 py-6"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="md">
          <View className="flex-row items-center justify-between">
            <Text
              className="text-lg mb-2"
              color={"$black"}
              fontWeight={"$bold"}
            >
              Accounts
            </Text>
            <TouchableOpacity onPress={handleRefresh}>
              <RefreshCw color="#000000" size={22} />
            </TouchableOpacity>
          </View>
          {accounts.map((account) => (
            <AccountCard
              key={account.name}
              title={account.name}
              balance={account.balance.toString()}
              onEdit={() => handleEdit(account.id)}
              onDelete={() => handleDelete(account.id)}
            />
          ))}
          <AddAccButton />
        </VStack>
      </ScrollView>
      {refreshing && (
        <View className="absolute inset-0 bg-white/60 justify-center items-center z-10">
          <Spinner size="large" color="$blue500" />
        </View>
      )}
    </View>
  );
}
