import { Box, Text } from '@gluestack-ui/themed';
import { Sparkles } from 'lucide-react-native';

export default function Header() {
  return (
    <Box px="$5" pt="$12" pb="$4" flexDirection="row" alignItems="center" gap="$2"   className="bg-slate-100   z-10">
      <Sparkles size={38} color="#6366F1" />
      <Text fontSize={25} fontFamily='$heading' fontWeight={'$extrabold'}  className=" text-indigo-600">My Day</Text>
    </Box>
  );
}
