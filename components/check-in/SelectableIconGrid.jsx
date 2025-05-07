import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';

import React, { useState } from 'react';
const SelectableIconGrid = ({ title, items }) => {
  const [selected, setSelected] = useState([]);

  const toggle = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((l) => l !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  return (
    <Box className="bg-white p-4 rounded-2xl mx-4 shadow">
        <Text className="text-lg font-semibold mb-3">{title}</Text>
        <VStack space="md">
          {Array.from({ length: Math.ceil(items.length / 4) }, (_, rowIndex) => (
            <HStack key={rowIndex} space="lg" justifyContent="space-between">
              {items.slice(rowIndex * 4, rowIndex * 4 + 4).map(({ icon: Icon, label }, idx) => {
                const active = selected.includes(label);
                return (
                  <Pressable
                    key={label}
                    onPress={() => toggle(label)}
                    className="items-center"
                  >
                    <Box
                      className={`p-3 rounded-full mb-1 ${
                        active ? 'bg-blue-100' : 'bg-gray-100'
                      }`}
                    >
                      <Icon size={24} color={active ? '#3b82f6' : '#6b7280'} />
                    </Box>
                    <Text  fontSize={12} fontWeight={'$medium'} className=" text-xxs text-gray-700">{label}</Text>
                  </Pressable>
                );
              })}
            </HStack>
          ))}
        </VStack>
      </Box>
  
  );
};

export default SelectableIconGrid;
