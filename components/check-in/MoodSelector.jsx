import { Box, HStack, Pressable, Text } from '@gluestack-ui/themed';
import { Angry, Frown, Laugh, Meh, Smile } from 'lucide-react-native';
import { useState } from 'react';

const moods = [
  { icon: Angry, label: 'Awful' },
  { icon: Frown, label: 'Bad' },
  { icon: Meh, label: 'Okay' },
  { icon: Smile, label: 'Good' },
  { icon: Laugh, label: 'Great' },
];

export default function MoodSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <Box className="bg-white p-4 rounded-2xl mx-4 mb-2  mt-4">
      <Text className="text-lg font-semibold text-center mb-3">How was your day?</Text>
      <HStack justifyContent="space-around">
        {moods.map(({ icon: Icon, label }, index) => {
          const isActive = selected === index;
          return (
            <Pressable
              key={index}
              onPress={() => setSelected(index)}
              className={`rounded-full p-2 ${
                isActive ? 'bg-yellow-200' : 'bg-gray-100'
              }`}
            >
              <Icon color={isActive ? '#eab308' : '#6b7280'} size={28} />
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
}
