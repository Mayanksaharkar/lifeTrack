import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';

interface TransactionItemProps {
  account: string;
  label: string;
  date: string;
  amount: string;
}

export default function TransactionItem({ account, label, date, amount }: TransactionItemProps) {
  return (
    <HStack justifyContent="space-between" alignItems="center" className="py-3">
      <HStack alignItems="center" space="sm">
        <Box className="  flex justify-center  px-2    " backgroundColor="$white " minWidth={70} alignItems='center' height={40}  rounded={10} >
          <Text color={"$black"} >
            {account}
          </Text>
        </Box>
        <VStack>
          <Text className="font-semibold" fontWeight={'$bold'}>{label}</Text>
          <Text className="text-gray-500 "  fontSize={'$xs'}>{date}</Text>
        </VStack>
      </HStack>
      <Text className="font-semibold">₹{amount}</Text>
    </HStack>
  );
}
