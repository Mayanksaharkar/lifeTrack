import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';

const SummaryCard = () => {
  const summaryItems = [
    { label: 'Mood', value: '😊', sub: 'Good' },
    { label: 'Spent', value: '$24.50', sub: 'Today' },
    { label: 'Sleep', value: '7.5h', sub: 'Last night' },
  ];

  return (
    <Box
      className=' bg-gray-100 rounded-2xl p-4 m-3'
    >
      <Text className='text-4xl font-extrabold text-black mb-3'>
        Today's Summary
      </Text>

      <HStack justifyContent="space-between" space="md">
        {summaryItems.map((item, i) => (
          <VStack key={i} alignItems="center" space="xs">
            <Text fontSize="$sm" color="$backgroundDark500">
              {item.label}
            </Text>
            <Text fontSize="$xl"  color="$black">
              {item.value}
            </Text>
            <Text fontSize="$xs" color="$backgroundDark500">
              {item.sub}
            </Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default SummaryCard;
