import { useExpenseContext } from "@/context/ExpenseContext";
import { Button, Icon, Text } from "@gluestack-ui/themed";
import { DollarSign, PlusCircle } from "lucide-react-native";
import { Modal, TextInput, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
export default function AddAccButton() {
  const {
    accModalVisible,
    setAccModalVisible,
    handleAccountAdd,
    newAccount,
    setNewAccount,
  } = useExpenseContext();

  const { user } = useAuth();
  return (
    <View>
      <Button
        variant="solid"
        borderRadius="$lg"
        onPress={() => setAccModalVisible(true)}
      >
        <Icon as={PlusCircle} size="md" color="$white" mr="$2" />
        <Text className="font-semibold" color="$white">
          Add New Account
        </Text>
      </Button>

      <Modal
        transparent
        visible={accModalVisible}
        animationType="slide"
        onRequestClose={() => setAccModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="bg-white rounded-xl w-4/5 max-w-[340px] p-4">
            <Text
              className="text-lg font-bold text-center mb-4 text-blue-500"
              fontSize="$xl"
              fontWeight="$bold"
            >
              Add New Account
            </Text>
            <View className="mb-4">
              <Text className="text-sm font-semibold mb-2">Account Name</Text>
              <View className="bg-gray-100 rounded-lg p-2">
                <TextInput
                  placeholder="Enter account name"
                  className="text-base border border-blue rounded-lg"
                  value={newAccount.name}
                  onChangeText={(text) =>
                    setNewAccount({ ...newAccount, name: text })
                  }
                />
              </View>
            </View>
            <View className="mb-4">
              <Text className="text-sm font-semibold mb-2">Balance</Text>
              <View className="bg-gray-100 rounded-lg p-2">
                <TextInput
                  placeholder="Enter balance"
                  keyboardType="numeric"
                  className="text-base border border-blue rounded-lg"
                  value={newAccount.balance}
                  onChangeText={(text) =>
                    setNewAccount({ ...newAccount, balance: text })
                  }
                />
              </View>
            </View>
            <View className="flex-row justify-evenly items-center mb-4">
              <Button
                variant="solid"
                borderRadius="$lg"
                onPress={() => {
                  handleAccountAdd({ newAccount, userId: user?.uid });
                  setNewAccount({ name: "", balance: "", icons: DollarSign });
                  setAccModalVisible(false);
                }}
              >
                <Text className="font-semibold" color="$white">
                  Save
                </Text>
              </Button>
              <Button
                variant="solid"
                borderRadius="$lg"
                onPress={() => {
                  setAccModalVisible(false);
                }}
              >
                <Text className="font-semibold" color="$white">
                  Cancel
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
