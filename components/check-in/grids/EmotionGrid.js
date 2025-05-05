import {
  Angry,
  Armchair,
  BedSingle,
  Candy,
  Cloud,
  Droplet,
  Eye,
  Ghost,
  Heart,
  LeafyGreen,
  MessageCircleDashed,
  Moon,
  PartyPopper,
  Rocket,
  Smile,
  Trophy,
  Weight,
  Laugh,
  Zap
} from 'lucide-react-native';
import React from 'react';
import SelectableIconGrid from '../SelectableIconGrid';
const emotions = [
  { label: 'Excited', icon: PartyPopper },
  { label: 'Relaxed', icon: Armchair },
  { label: 'Proud', icon: Trophy },
  { label: 'Hopeful', icon: Smile },
  { label: 'Happy', icon: Laugh },
  { label: 'Enthusiastic', icon: Rocket },
  { label: 'Pit-a-pat', icon: Heart },
  { label: 'Refreshed', icon: Droplet },
  { label: 'Calm', icon: Moon },
  { label: 'Grateful', icon: Candy },
  { label: 'Depressed', icon: Cloud },
  { label: 'Lonely', icon: Ghost },
  { label: 'Anxious', icon: LeafyGreen },
  { label: 'Sad', icon: Eye },
  { label: 'Angry', icon: Angry },
  { label: 'Pressured', icon: Weight },
  { label: 'Annoyed', icon: Angry },
  { label: 'Tired', icon: BedSingle },
  { label: 'Stressed', icon: Zap },
  { label: 'Bored', icon: MessageCircleDashed },
];
export default function EmotionGrid() {



  return (
    <SelectableIconGrid items={emotions} title="Emotions" />
    


  );
}
