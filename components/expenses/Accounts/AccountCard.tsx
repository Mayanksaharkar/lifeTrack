import { Box, HStack, Icon, Pressable, Text, VStack } from "@gluestack-ui/themed";
import { LucideIcon } from "lucide-react-native";

interface AccountCardProps {
  icon: LucideIcon;
  title: string;
  balance: string;
  iconBgColor: string;
}

const AccountCard = ({ icon: IconComponent, title, balance, iconBgColor }: AccountCardProps) => {
  return (
    <Box
      className="border border-gray rounded-lg px-4 py-3 mb-2 bg-white"
    >
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space="md" alignItems="center">
          <Box className='p-3 shadow shadow-black bg-blue' rounded="$full">
            <Icon as={IconComponent} size="md"  color="$white" />
          </Box>
          <VStack>
            <Text className="text-blue text-base font-semibold">{title}</Text>
            <Text className="text-green-400">Balance: ₹{balance}</Text>
          </VStack>
        </HStack>
        <Pressable>
        <Icon as={require("lucide-react-native").MoreVertical} size="md" color="$blue500" />
        </Pressable>
      </HStack>
    </Box>
  );
};

export default AccountCard;
