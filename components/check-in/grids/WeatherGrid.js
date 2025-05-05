import {
  Cloud, CloudHail, CloudSnow,
  Snowflake,
  Sun,
  ThermometerSun,
  Tornado,
  Wind
} from 'lucide-react-native';
import SelectableIconGrid from '../SelectableIconGrid';
const weather = [
    { label: 'Sunny', icon: Sun },
    { label: 'Cloudy', icon: Cloud },
    { label: 'Rainy', icon: CloudHail },
    { label: 'Snowy', icon: CloudSnow },
    { label: 'Windy', icon: Wind },
    { label: 'Stormy', icon: Tornado },
    { label: 'Hot', icon: ThermometerSun },
    { label: 'Cold', icon: Snowflake }
];
export default function WeatherGrid() {
  return (
    <SelectableIconGrid
      title="Weather"
      items={weather}/>
  );
}
