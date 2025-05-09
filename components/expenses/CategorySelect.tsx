import { HStack, Icon, Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger, Text } from '@gluestack-ui/themed';
import { ChevronDown, Home, Settings, User } from 'lucide-react-native';
import React, { useState } from 'react';
const options = [
  { label: 'Home', icon: Home, value: 'home' },
  { label: 'Profile', icon: User, value: 'profile' },
  { label: 'Settings', icon: Settings, value: 'settings' },
];

const IconSelect = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <Select selectedValue={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="bg-white border border-gray-300 rounded-xl px-4 py-3">
        <SelectInput placeholder="Select option" />
        <SelectIcon as={ChevronDown} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent className="bg-white rounded-xl p-2">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator className="bg-gray-400" />
          </SelectDragIndicatorWrapper>
          {options.map(({ label, icon: IconComponent, value }) => (
            <SelectItem key={value} label={label} value={value}>
              <HStack space="sm" alignItems="center">
                <Icon as={IconComponent} size="sm" />
                <Text>{label}</Text>
              </HStack>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default IconSelect;
