import { HStack, Text, VStack } from '@gluestack-ui/themed';
import { Search, User } from 'lucide-react-native';

export default function Header() {
  return (
    <HStack  className='  ' justifyContent="space-between" px="$4" mt={18} py={20} backgroundColor='white' >
      <VStack>
        <Text className="text-xl font-bold">Dashboard</Text>
        <Text className="text-gray-500">Wednesday, May 3</Text>
      </VStack>
      <HStack space="md" alignItems="center">
        <Search />
        <User />
      </HStack>
    </HStack>
  );
}
