import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React, { memo, useCallback } from 'react';
import { useCheckIn } from '../../context/CheckInContext';

const IconItem = memo(({ Icon, label, active, onPress }) => (
  <Pressable
    gap={5}
    onPress={onPress}
    className="items-center"
  >
    <Box
      rounded={30}
      backgroundColor={active ? '#3b82f6' : '#f3f4f6'}
      padding={15}
      className='   '
    >
      <Icon size={24} color={active ? '#f3f4f6' : '#3b82f6'} />
    </Box>
    <Text fontSize={12} fontWeight={'$medium'} className="text-xxs text-gray-700">
      {label}
    </Text>
  </Pressable>
));

const SelectableIconGrid = memo(({ title, items, gridType }) => {
  const { checkInData, setGridSelection } = useCheckIn();
  const selected = checkInData.grids[gridType] || [];

  const toggle = useCallback((label) => {
    setGridSelection(
      gridType,
      selected.includes(label)
        ? selected.filter((l) => l !== label)
        : [...selected, label]
    );
  }, [gridType, selected, setGridSelection]);

  return (
    <Box className="bg-white p-4 rounded-2xl mx-4" shadowColor='$black' boxShadow={'$lg'}>
      <Text className="mb-3" fontWeight={'$bold'} fontSize={'$lg'}>{title}</Text>
      <VStack space="md">
        {Array.from({ length: Math.ceil(items.length / 4) }, (_, rowIndex) => (
          <HStack key={rowIndex} space="lg" justifyContent="space-between">
            {items.slice(rowIndex * 4, rowIndex * 4 + 4).map(({ icon: Icon, label }) => (
              <IconItem
                key={label}
                Icon={Icon}
                label={label}
                active={selected.includes(label)}
                onPress={() => toggle(label)}
              />
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
});

export default SelectableIconGrid;