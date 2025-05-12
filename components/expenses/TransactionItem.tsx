import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
  Modal, // Add Modal import
  Button, // Add Button import
} from "@gluestack-ui/themed";
import { ArrowDownCircle, ArrowUpCircle, Info } from "lucide-react-native";
import { useState } from "react";

export default function TransactionItem({
  account,
  label,
  date,
  amount,
  notes,
  entryType,
  category,
  onEdit, // Optional: pass edit handler as prop
  onDelete,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // For modal

  // Define colors and icons based on transaction type
  const getTypeDetails = () => {
    // console.log("entryType", entryType);
    switch (entryType) {
      case "INCOME":
        return {
          icon: ArrowDownCircle,
          bgColor: "$green50",
          color: "$green500",
        };
      default: // EXPENSE
        return {
          icon: ArrowUpCircle,
          color: "$red500",
          bgColor: "$red50",
        };
    }
  };

  const { icon, color, bgColor } = getTypeDetails();

  return (
    <>
      <Pressable
        onPress={() => setShowDetails(!showDetails)}
        onLongPress={() => setShowOptions(true)} // Show options on hold
        $w="$full"
        $maxWidth="$md"
        $mx="auto"
      >
        <Box
          borderWidth={1}
          borderColor="$gray200"
          borderRadius="$xl"
          overflow="hidden"
          backgroundColor={`${bgColor}:alpha.60`}
        >
          {}
          <VStack space="xs" px="$4" py="$3">
            <HStack justifyContent="space-between" alignItems="center">
              <HStack space="sm" alignItems="center">
                <Box p="$2" borderRadius="$full" backgroundColor={bgColor}>
                  <Icon as={icon} size="md" color={color} />
                </Box>

                <VStack>
                  <Text fontWeight="$semibold" fontSize="$lg">
                    {label}
                  </Text>
                  <Text fontSize="$sm" color="$gray500">
                    {account}
                  </Text>
                </VStack>
              </HStack>

              <VStack alignItems="flex-end">
                <Text fontWeight="$bold" fontSize="$lg" color={"$blue500"}>
                  ₹{amount}
                </Text>
                <Text fontSize="$xs" color="$gray500">
                  {date}
                </Text>
              </VStack>
            </HStack>

            {}
            {notes && (
              <HStack justifyContent="flex-start" mt="$1">
                <Text fontSize="$xs" color="$gray400" fontStyle="italic">
                  Note: {notes}
                </Text>
              </HStack>
            )}
          </VStack>

          {showDetails && (
            <Box>
              <Divider />
              <Box bg="$white" p="$4">
                <HStack space="xs" alignItems="flex-start" mb="$2">
                  <Icon as={Info} size="xs" color="$gray400" mt="$1" />
                  <Text fontSize="$sm" color="$gray600" flex={1}>
                    {notes || "No additional notes"}
                  </Text>
                </HStack>

                <Box
                  mt="$3"
                  pt="$3"
                  borderTopWidth={1}
                  borderTopColor="$gray100"
                >
                  <HStack justifyContent="space-between" mb="$1">
                    <Text fontSize="$sm" color="$gray500">
                      Category
                    </Text>
                    <Text fontSize="$sm" fontWeight="$medium">
                      {label}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Pressable>
      <Modal
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
        backgroundColor="rgba(0, 0, 0, 0.3)"
        animationName={'fade'}
        animationDuration={300}
      >
        <Modal.Content>
          <Modal.Header>
            <Text>Options</Text>
          </Modal.Header>
          <Modal.Body>
            <Button
              mb="$2"
              onPress={() => {
                setShowOptions(false);
                onEdit && onEdit();
              }}
            >
              <Text>Edit</Text>
            </Button>
            <Button
              variant="outline"
              onPress={() => {
                setShowOptions(false);
                onDelete && onDelete();
              }}
            >
              <Text>Delete</Text>
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="solid" onPress={() => setShowOptions(false)}>
              <Text>Cancel</Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
