import React from 'react';
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectContent, SelectItem, SelectBackdrop, SelectDragIndicator, SelectDragIndicatorWrapper } from '@gluestack-ui/themed';
import { ChevronDown } from 'lucide-react-native';
import { Text, HStack, Icon } from '@gluestack-ui/themed';
import { Home, User, Settings } from 'lucide-react-native';

const options = [
  { label: 'Home', icon: Home, value: 'home' },
  { label: 'Profile', icon: User, value: 'profile' },
  { label: 'Settings', icon: Settings, value: 'settings' },
];

const IconSelect = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

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
