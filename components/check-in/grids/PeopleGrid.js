import {
  CircleSlash, Heart,
  House,
  Users
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const people = [
  { label: 'Friends', icon: Users },
  { label: 'Family', icon: House },
  { label: 'Partner', icon: Heart },
  { label: 'None', icon: CircleSlash },
];
export default function PeopleGrid() {
  return (
    <SelectableIconGrid 
    title="Who were you with?"
    items={people}
    gridType="people"
  />
  );
}
