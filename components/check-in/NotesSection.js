import { Box, Text, Textarea, TextareaInput, Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';
import { Camera } from 'lucide-react-native';

export default function NotesSection() {
  return (
    <Box className="bg-white rounded-2xl mx-4 p-4 mb-4 shadow">
      <Text className="text-lg font-semibold text-gray-800 mb-2">Notes</Text>
      <Textarea>
        <TextareaInput placeholder="Add notes about your day..." />
      </Textarea>
      <Button variant="outline" className="mt-3 border-gray-300">
        <ButtonIcon as={Camera} />
        <ButtonText className="ml-2">Attach photo</ButtonText>
      </Button>
    </Box>
  );
}
