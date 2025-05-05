import { Button, ButtonText, HStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

export default function ActionButtons() {
  const navigation = useNavigation();

  const handleCaptureDayClick = () => {
    navigation.navigate('check-in'); // Replace 'Checkin' with the actual name of your tab or screen
  };
  const handleExpensesClick = () => {
    navigation.navigate('expenses'); // Replace 'Checkin' with the actual name of your tab or screen
  };

  return (
    <HStack space="md" px="$4" py="$2" >
      <Button variant="solid" className='shadow'  minHeight={60} borderRadius={10}  bgColor='$blue300' flex={1} onPress={handleCaptureDayClick}>
        <ButtonText fontWeight={'$extrabold'} >+ Capture Day</ButtonText>
      </Button>
      <Button variant="solid"  className='shadow ' minHeight={60} bgColor='$green300' borderRadius={10} flex={1} onPress={handleExpensesClick}>
        <ButtonText fontWeight={'$extrabold'}>+ Add Expense</ButtonText>
      </Button>
    </HStack>
  );
}
