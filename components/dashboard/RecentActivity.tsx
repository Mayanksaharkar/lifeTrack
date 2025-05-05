import { Box, HStack, Text, VStack } from '@gluestack-ui/themed';

export default function RecentActivity() {
  const items = [
    { title: 'Mood tracked', time: 'Today, 10:30 AM', right: '😊' },
    { title: 'Coffee shop', time: 'Today, 9:15 AM', right: '$4.50' },
    { title: 'Grocery store', time: 'Yesterday, 6:30 PM', right: '$20.00' },
  ];

  return (
    <Box  className='mx-4 my-3 p-4 rounded-3xl shadow bg-neutral-50'>
      <Text className=" font-semibold mb-3">Recent Activity</Text>
      <VStack space="md">
        {items.map((item, index) => (
          <HStack key={index} justifyContent="space-between">
            <VStack>
              <Text className="text-lg text-red-800">{item.title}</Text>
              <Text className="text-xs text-gray-500">{item.time}</Text>
            </VStack>
            <Text className="text-sm font-medium">{item.right}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>

    // <View>
    //   <Text className='text-4xl text-red-500'>Hello</Text>
    // </View>
  );
}
