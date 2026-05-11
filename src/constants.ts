import { Book, Headset, MessageSquare, PenTool } from 'lucide-react';
import { DailyMission, Lesson } from './types';

export const COLORS = {
  primary: '#582CFF',
  secondary: '#FFC800',
  accent: '#FF4B4B',
  sidebar: '#231F3F',
};

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Listen',
    description: 'Master the sounds of English.',
    type: 'listening',
    difficulty: 1,
    xpReward: 10,
    isLocked: false,
    stars: 3,
  },
  {
    id: '2',
    title: 'Speak',
    description: 'Perfect your pronunciation.',
    type: 'speaking',
    difficulty: 1,
    xpReward: 15,
    isLocked: false,
    stars: 2,
  },
  {
    id: '3',
    title: 'Read',
    description: 'Boost your reading speed.',
    type: 'reading',
    difficulty: 1,
    xpReward: 10,
    isLocked: false,
    stars: 3,
  },
  {
    id: '4',
    title: 'Write',
    description: 'Learn to write clearly.',
    type: 'writing',
    difficulty: 1,
    xpReward: 20,
    isLocked: false,
    stars: 1,
  },
  {
    id: '5',
    title: 'Challenge',
    description: 'Unlock the ultimate test.',
    type: 'reading',
    difficulty: 2,
    xpReward: 50,
    isLocked: true,
    stars: 0,
  },
];

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'mission-1',
    title: 'Complete 3 vocabulary lessons',
    progress: 2,
    goal: 3,
    reward: { xp: 20, gems: 50 },
  },
];

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'learn', label: 'Learn', icon: 'Book' },
  { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
  { id: 'friends', label: 'Friends', icon: 'Users' },
  { id: 'ranking', label: 'Ranking', icon: 'BarChart' },
  { id: 'shop', label: 'Shop', icon: 'ShoppingBag' },
  { id: 'profile', label: 'Profile', icon: 'User' },
];
