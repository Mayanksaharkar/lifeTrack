import {
  CookingPot,
  HandPlatter,
  Sandwich,
  Soup
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const meals = [
  { label: 'Breakfast', icon: Sandwich },
  { label: 'Lunch', icon: Soup },
  { label: 'Dinner', icon: HandPlatter },
  { label: 'Night snack', icon: CookingPot },
];
export default function MealGrid() {
  return (
    <SelectableIconGrid 
      title="What did you eat?"
      items={meals}
      gridType="meals"
    />
  );
}
