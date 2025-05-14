import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React, { memo, useCallback, useMemo } from 'react';
import { useCheckIn } from '../../context/CheckInContext';

// Optimize IconItem with better props comparison
const IconItem = memo(
  ({ Icon, label, active, onPress }) => (
    <Pressable
      gap={5}
      onPress={onPress}
      className="items-center"
    >
      <Box
        rounded={30}
        backgroundColor={active ? '#3b82f6' : '#f3f4f6'} 
        padding={15}
      >
        <Icon size={24} color={active ? '#f3f4f6' : '#3b82f6'} />
      </Box>
      <Text fontSize={12} fontWeight={'$medium'} className="text-xxs text-gray-700">
        {label}
      </Text>
    </Pressable>
  ),
  // Custom comparison function to prevent unnecessary re-renders
  (prevProps, nextProps) => {
    return prevProps.active === nextProps.active && 
           prevProps.label === nextProps.label;
  }
);

IconItem.displayName = 'IconItem';

const SelectableIconGrid = memo(({ title, items, gridType }) => {
  const { checkInData, setGridSelection } = useCheckIn();
  
  // Ensure we always have a valid array, even if it's empty
  const selected = useMemo(() => 
    Array.isArray(checkInData.grids[gridType]) ? checkInData.grids[gridType] : [], 
    [checkInData.grids, gridType]
  );

  // Improved toggle function for reliable multi-selection
  const toggle = useCallback((label) => {
    setGridSelection(gridType, (current) => {
      // Ensure current is an array
      const currentSelections = Array.isArray(current) ? current : [];
      const isSelected = currentSelections.includes(label);
      
      // Toggle selection
      return isSelected 
        ? currentSelections.filter(item => item !== label) 
        : [...currentSelections, label];
    });
  }, [gridType, setGridSelection]);

  // Pre-calculate rows for better performance
  const rows = useMemo(() => {
    return Array.from(
      { length: Math.ceil(items.length / 4) }, 
      (_, rowIndex) => ({
        rowIndex,
        rowItems: items.slice(rowIndex * 4, rowIndex * 4 + 4)
      })
    );
  }, [items]);

  // Pre-calculate onPress handlers for each item to avoid recreating them
  const handlePressMap = useMemo(() => {
    const map = new Map();
    items.forEach(({ label }) => {
      map.set(label, () => toggle(label));
    });
    return map;
  }, [items, toggle]);

  return (
    <Box 
      className="bg-white p-4 rounded-2xl mx-4" 
      shadowColor='$black' 
      boxShadow={'$lg'}
    >
      <Text className="mb-3" fontWeight={'$bold'} fontSize={'$lg'}>{title}</Text>
      <VStack space="md">
        {rows.map(({ rowIndex, rowItems }) => (
          <HStack key={rowIndex} space="lg" justifyContent="space-between">
            {rowItems.map(({ icon: Icon, label }) => {
              const isActive = selected.includes(label);
              const handlePress = handlePressMap.get(label);
              
              return (
                <IconItem
                  key={label}
                  Icon={Icon}
                  label={label}
                  active={isActive}
                  onPress={handlePress}
                />
              );
            })}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
});

SelectableIconGrid.displayName = 'SelectableIconGrid';

export default SelectableIconGrid;
