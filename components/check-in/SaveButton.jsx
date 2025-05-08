import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { CheckCircle } from 'lucide-react-native';

export default function SaveButton() {
  return (
    <Box px="$4" mt="$2" mb="$5">
      <Button className=" rounded-full" backgroundColor="$blue500">
        <CheckCircle size={20} color="white" />
        <ButtonText className="ml-2 text-white">Save</ButtonText>
      </Button>
    </Box>
  );
}
