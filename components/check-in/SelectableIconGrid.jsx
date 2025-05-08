import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';

import React, { useState } from 'react';
const SelectableIconGrid = ({ title, items }) => {
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   console.log('Selected items:', selected);
  // }
  // , [selected]);  

  const toggle = (label) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((l) => l !== label));
    } else {
      setSelected([...selected, label]);
    }
  };

  return (
    <Box className="bg-white p-4 rounded-2xl mx-4 " shadowColor='$black' boxShadow={'$lg'} >
        <Text className=" mb-3" fontWeight={'$bold'} fontSize={'$lg'}>{title}</Text>
        <VStack space="md">
          {Array.from({ length: Math.ceil(items.length / 4) }, (_, rowIndex) => (
            <HStack key={rowIndex} space="lg" justifyContent="space-between">
              {items.slice(rowIndex * 4, rowIndex * 4 + 4).map(({ icon: Icon, label }, idx) => {
                const active = selected.includes(label);
                return (
                  <Pressable
                    key={label}
                    gap={5}
                    onPress={() => toggle(label)}
                    className="items-center"
                  >
                    <Box
                      rounded={30}
                      backgroundColor={active ? '#3b82f6' : '#f3f4f6'}
                      padding={15}
                      className='shadow shadow-black'
                      
                    >
                      <Icon size={24} color={active ? '#f3f4f6' : '#3b82f6'} />
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
