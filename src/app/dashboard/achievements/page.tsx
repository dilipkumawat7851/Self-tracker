"use client";

import { motion } from "framer-motion";
import { mockAchievements } from "@/lib/mock-data";

const allBadges = [
  { badgeId: "first_habit", title: "First Step", description: "Create your first habit", icon: "🌱", requirement: "1 habit created" },
  { badgeId: "streak_7", title: "Weekly Warrior", description: "Maintain a 7-day streak", icon: "🔥", requirement: "7 day streak" },
  { badgeId: "level_5", title: "Rising Star", description: "Reach Level 5", icon: "⭐", requirement: "500 XP" },
  { badgeId: "streak_30", title: "Unstoppable", description: "Maintain a 30-day streak", icon: "💎", requirement: "30 day streak" },
  { badgeId: "streak_100", title: "Legend", description: "Maintain a 100-day streak", icon: "👑", requirement: "100 day streak" },
  { badgeId: "habits_10", title: "Habit Master", description: "Track 10 habits simultaneously", icon: "🎯", requirement: "10 active habits" },
  { badgeId: "perfect_week", title: "Perfect Week", description: "Complete all habits for 7 consecutive days", icon: "💯", requirement: "7 perfect days" },
  { badgeId: "early_bird", title: "Early Bird", description: "Complete a habit before 7 AM", icon: "🌅", requirement: "Pre-7AM completion" },
  { badgeId: "night_owl", title: "Night Owl", description: "Complete a habit after 11 PM", icon: "🦉", requirement: "Post-11PM completion" },
  { badgeId: "comeback", title: "Comeback Kid", description: "Restart a broken streak and reach 7 days", icon: "🔄", requirement: "Restart + 7 days" },
  { badgeId: "xp_5000", title: "XP Master", description: "Accumulate 5,000 XP", icon: "⚡", requirement: "5,000 total XP" },
  { badgeId: "diversity", title: "Well-Rounded", description: "Have habits in 5 different categories", icon: "🌈", requirement: "5 categories" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function AchievementsPage() {
  const unlockedIds = new Set(mockAchievements.map((a) => a.badgeId));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-5xl space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold font-display">Achievements</h1>
        <p className="text-sm text-surface-200/50 mt-1">
          {mockAchievements.length} / {allBadges.length} badges unlocked
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold font-display text-brand-400">{mockAchievements.length}</p>
          <p className="text-xs text-surface-200/40 mt-1">Unlocked</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold font-display text-surface-200/30">
            {allBadges.length - mockAchievements.length}
          </p>
          <p className="text-xs text-surface-200/40 mt-1">Locked</p>
        </div>
        <div className="glass-card p-5 text-center">
          <p className="text-3xl font-bold font-display text-accent-400">
            {Math.round((mockAchievements.length / allBadges.length) * 100)}%
          </p>
          <p className="text-xs text-surface-200/40 mt-1">Completion</p>
        </div>
      </motion.div>

      {/* Badges Grid */}
      <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBadges.map((badge) => {
          const unlocked = unlockedIds.has(badge.badgeId);
          return (
            <motion.div
              key={badge.badgeId}
              variants={fadeUp}
              className={`glass-card p-5 text-center transition-all duration-300 ${
                unlocked
                  ? "border-brand-500/20 hover:border-brand-500/30"
                  : "opacity-40 grayscale"
              }`}
            >
              <div
                className={`text-4xl mb-3 ${
                  unlocked ? "animate-float" : ""
                }`}
              >
                {badge.icon}
              </div>
              <h3 className="text-sm font-semibold">{badge.title}</h3>
              <p className="text-xs text-surface-200/40 mt-1">{badge.description}</p>
              <div className="mt-3">
                {unlocked ? (
                  <span className="badge-accent text-[10px]">✓ Unlocked</span>
                ) : (
                  <span className="text-[10px] text-surface-200/30">{badge.requirement}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
