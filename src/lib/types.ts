// Types for the GrowthMind application

export type Frequency = "daily" | "weekly" | "monthly";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  xp: number;
  level: number;
  createdAt: Date;
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  frequency: Frequency;
  targetDays: number;
  streak: number;
  longestStreak: number;
  isActive: boolean;
  completedToday: boolean;
  createdAt: Date;
}

export interface HabitLog {
  id: string;
  habitId: string;
  completedDate: Date;
  note?: string;
  createdAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  badgeId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface AIInsight {
  id: string;
  userId: string;
  content: string;
  type: "tip" | "motivation" | "analysis" | "warning";
  createdAt: Date;
}

export interface WeeklyStat {
  day: string;
  completed: number;
  total: number;
}

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
