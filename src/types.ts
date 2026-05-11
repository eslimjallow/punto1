export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  xp: number;
  level: number;
  streak: number;
  gems: number;
  energy: {
    current: number;
    max: number;
    lastRefillAt: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'listening' | 'speaking' | 'reading' | 'writing';
  difficulty: number;
  xpReward: number;
  isLocked: boolean;
  stars: number; // 0-3
}

export interface DailyMission {
  id: string;
  title: string;
  progress: number;
  goal: number;
  reward: {
    xp: number;
    gems: number;
  };
}

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL?: string;
  xp: number;
  rank: number;
  isCurrentUser?: boolean;
}
