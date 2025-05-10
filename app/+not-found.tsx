import { View, Text } from '@gluestack-ui/themed';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-xl font-bold">This screen does not exist.</Text>
      <Link href="/" className="mt-4 py-4">
        <Text className="text-blue-500 underline">Go to home screen!</Text>
      </Link>
    </View>
  );
}
