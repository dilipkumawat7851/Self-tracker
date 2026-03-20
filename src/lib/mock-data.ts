import type { Habit, Achievement, AIInsight, WeeklyStat, HeatmapDay } from "./types";

// ── Mock Habits ──
export const mockHabits: Habit[] = [
  {
    id: "1",
    userId: "user1",
    name: "Morning Meditation",
    description: "15 minutes of mindfulness meditation",
    icon: "🧘",
    color: "#8b5cf6",
    frequency: "daily",
    targetDays: 7,
    streak: 12,
    longestStreak: 18,
    isActive: true,
    completedToday: false,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    userId: "user1",
    name: "Read 30 Pages",
    description: "Read at least 30 pages of a book",
    icon: "📚",
    color: "#06b6d4",
    frequency: "daily",
    targetDays: 7,
    streak: 8,
    longestStreak: 15,
    isActive: true,
    completedToday: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: "3",
    userId: "user1",
    name: "Workout",
    description: "45 min strength training or cardio",
    icon: "💪",
    color: "#10b981",
    frequency: "daily",
    targetDays: 5,
    streak: 5,
    longestStreak: 22,
    isActive: true,
    completedToday: false,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "4",
    userId: "user1",
    name: "Learn DSA",
    description: "Solve 2 coding problems on LeetCode",
    icon: "💻",
    color: "#f59e0b",
    frequency: "daily",
    targetDays: 6,
    streak: 3,
    longestStreak: 10,
    isActive: true,
    completedToday: false,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "5",
    userId: "user1",
    name: "Journal",
    description: "Write a gratitude journal entry",
    icon: "✍️",
    color: "#ec4899",
    frequency: "daily",
    targetDays: 7,
    streak: 20,
    longestStreak: 20,
    isActive: true,
    completedToday: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "6",
    userId: "user1",
    name: "Drink 3L Water",
    description: "Stay hydrated throughout the day",
    icon: "💧",
    color: "#3b82f6",
    frequency: "daily",
    targetDays: 7,
    streak: 15,
    longestStreak: 30,
    isActive: true,
    completedToday: false,
    createdAt: new Date("2024-01-20"),
  },
];

// ── Mock Achievements ──
export const mockAchievements: Achievement[] = [
  {
    id: "a1",
    userId: "user1",
    badgeId: "first_habit",
    title: "First Step",
    description: "Create your first habit",
    icon: "🌱",
    unlockedAt: new Date("2024-01-01"),
  },
  {
    id: "a2",
    userId: "user1",
    badgeId: "streak_7",
    title: "Weekly Warrior",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    unlockedAt: new Date("2024-01-08"),
  },
  {
    id: "a3",
    userId: "user1",
    badgeId: "level_5",
    title: "Rising Star",
    description: "Reach Level 5",
    icon: "⭐",
    unlockedAt: new Date("2024-01-20"),
  },
  {
    id: "a4",
    userId: "user1",
    badgeId: "streak_30",
    title: "Unstoppable",
    description: "Maintain a 30-day streak",
    icon: "💎",
    unlockedAt: new Date("2024-02-01"),
  },
];

// ── Mock AI Insights ──
export const mockInsights: AIInsight[] = [
  {
    id: "i1",
    userId: "user1",
    content:
      "Your meditation consistency has improved 40% this week. The morning routine is becoming second nature — keep the momentum!",
    type: "analysis",
    createdAt: new Date(),
  },
  {
    id: "i2",
    userId: "user1",
    content:
      "Try pairing your workout with your reading habit. Studies show exercise before reading increases retention by 25%.",
    type: "tip",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: "i3",
    userId: "user1",
    content:
      "You're on track for your best month yet! 🎯 4 more days until you unlock the 'Consistency King' badge.",
    type: "motivation",
    createdAt: new Date(Date.now() - 7200000),
  },
];

// ── Mock Weekly Stats ──
export const mockWeeklyStats: WeeklyStat[] = [
  { day: "Mon", completed: 5, total: 6 },
  { day: "Tue", completed: 4, total: 6 },
  { day: "Wed", completed: 6, total: 6 },
  { day: "Thu", completed: 3, total: 6 },
  { day: "Fri", completed: 5, total: 6 },
  { day: "Sat", completed: 4, total: 6 },
  { day: "Sun", completed: 2, total: 6 },
];

// ── Mock Heatmap Data (last 16 weeks / ~112 days) ──
export const mockHeatmapData: HeatmapDay[] = (() => {
  const data: HeatmapDay[] = [];
  const today = new Date();
  for (let i = 111; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = Math.floor(Math.random() * 7);
    const level = (count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 5 ? 3 : 4) as
      | 0
      | 1
      | 2
      | 3
      | 4;
    data.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }
  return data;
})();
