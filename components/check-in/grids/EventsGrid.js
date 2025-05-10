import {
  Coffee,
  Dumbbell,
  House,
  Laptop,
  Projector,
  School,
  ShoppingBag,
  Shrub,
  TicketsPlane,
  Utensils,
  Volleyball
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const events = [
  { label: 'Stay Home', icon: House },
  { label: 'School', icon: School },
  { label: 'Work', icon: Laptop },
  { label: 'Restaurant', icon: Utensils },
  { label: 'Cafe', icon: Coffee },
  { label: 'Shopping', icon: ShoppingBag },
  { label: 'Travel', icon: TicketsPlane },
  { label: 'Party', icon: PartyPopper },
  { label: 'Cinema', icon: Projector },
  { label: 'Gym', icon: Dumbbell },
  { label: 'Park', icon: Shrub },
  { label: 'Beach', icon: Volleyball },
];
export default function EventsGrid() {
  return (
    <SelectableIconGrid 
    title="Events"
    items={events}
    gridType="events"
  />
  );
}
