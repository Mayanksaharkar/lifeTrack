import {
  Donut,
  Coffee,
  Wine,
  Cigarette,
  CupSoda
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const other = [
  { label: 'Snack', icon: Donut },
  { label: 'Coffee', icon: Coffee },
  { label: 'Alcohol', icon: Wine },
  { label: 'Smoking', icon: Cigarette },
  { label: 'Beverage', icon: CupSoda },
 
];
export default function OtherGrid() {
  return (
    <SelectableIconGrid 
    title="Other"
    items={other}
    gridType="other"
  />
  );
}
