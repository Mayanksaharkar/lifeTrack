
import { ScrollView } from "@gluestack-ui/themed";
import EmotionGrid from "./grids/EmotionGrid";
import MealGrid from "./grids/MealGrid";
import OtherGrid from "./grids/OtherGrid";
import PeopleGrid from "./grids/PeopleGrid";
import SelfCareGrid from "./grids/SelfCareGrid";
import WeatherGrid from "./grids/WeatherGrid";
export default function Grids() {
    return (
        <ScrollView className="flex-1 bg-slate-100 py-2" contentContainerStyle={{ gap: 10 }}>
            <EmotionGrid />
            <PeopleGrid />
            <WeatherGrid />
            <MealGrid />
            <SelfCareGrid />
            <OtherGrid />
        </ScrollView>
    );
}
