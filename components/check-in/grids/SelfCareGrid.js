import {
    Bubbles,
    GlassWater,
    ShowerHead,
    SmilePlus
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const selfCare = [
    { label: 'Brush teeth', icon: Bubbles },
    { label: 'Shower', icon: ShowerHead },
    { label: 'wash face', icon: SmilePlus },
    { label: 'drink water', icon: GlassWater },
];
export default function SelfCareGrid() {
    return (
        <SelectableIconGrid
            title="Self care"
            items={selfCare} />
    );
}
