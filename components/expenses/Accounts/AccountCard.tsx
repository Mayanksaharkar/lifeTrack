import {
  Menu,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "@/components/ui/menu";
import { Box, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import { Alert, Pressable } from "react-native";

import { Edit3, MoreVertical, Trash2 } from "lucide-react-native";
import React from "react";

interface AccountCardProps {
  
  title: string;
  balance: string;
  iconBgColor: string;
  onEdit: () => void;
  onDelete: () => void;
}

const AccountCard = ({
  title,
  balance,
  onEdit,
  onDelete,
}: AccountCardProps) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <Box className="border border-gray rounded-lg px-4 py-3 mb-2 bg-white">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space="md" alignItems="center">
          <Box className="p-5     bg-blue" rounded="$full">
            {/* <Icon as={IconComponent} size="md" color="$white" /> */}
          </Box>
          <VStack>
            <Text className="text-blue text-base font-semibold">{title}</Text>
            <Text className="">Balance: ₹{balance}</Text>
          </VStack>
        </HStack>

        <Pressable>
          <Menu
            placement="bottom right"
            offset={8}
            className="bg-white   rounded-lg"
            trigger={({ ...triggerProps }) => {
              return <Icon as={MoreVertical} size="xl" {...triggerProps} />;
            }}
          >
            <MenuItem key="Edit" textValue="Edit" onPress={onEdit}>
              <Icon as={Edit3} size="sm" className="mr-2" />
              <MenuItemLabel size="sm">Edit</MenuItemLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuItem key="Delete" textValue="Delete" onPress={handleDelete}>
              <Icon as={Trash2} size="sm" className="mr-2" />
              <MenuItemLabel size="sm">Delete</MenuItemLabel>
            </MenuItem>
            <MenuSeparator />
          </Menu>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default AccountCard;
