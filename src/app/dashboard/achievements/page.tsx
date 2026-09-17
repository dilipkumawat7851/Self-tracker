"use client";

import { motion } from "framer-motion";
import { mockAchievements } from "@/lib/mock-data";
import { Trophy, Award, Lock, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/motion/motion-variants";

const allBadges = [
  { badgeId: "first_habit", title: "First Step", description: "Create and initialize your first habit protocol", icon: "🌱", requirement: "1 habit created" },
  { badgeId: "streak_7", title: "Weekly Warrior", description: "Maintain a 7-day unbroken habit streak", icon: "🔥", requirement: "7 day streak" },
  { badgeId: "level_5", title: "Rising Star", description: "Accumulate 500 XP through protocol executions", icon: "⭐", requirement: "500 XP" },
  { badgeId: "streak_30", title: "Unstoppable", description: "Maintain a 30-day unbroken habit streak", icon: "💎", requirement: "30 day streak" },
  { badgeId: "streak_100", title: "Centurion Legend", description: "Maintain a 100-day unbroken habit streak", icon: "👑", requirement: "100 day streak" },
  { badgeId: "habits_10", title: "Habit Master", description: "Track 10 active habit protocols concurrently", icon: "🎯", requirement: "10 active habits" },
  { badgeId: "perfect_week", title: "Flawless Execution", description: "Execute 100% of planned daily habits for 7 consecutive days", icon: "💯", requirement: "7 perfect days" },
  { badgeId: "early_bird", title: "Dawn Catalyst", description: "Complete a habit protocol before 7:00 AM", icon: "🌅", requirement: "Pre-7AM completion" },
  { badgeId: "night_owl", title: "Night Protocol", description: "Complete a habit protocol after 11:00 PM", icon: "🦉", requirement: "Post-11PM completion" },
  { badgeId: "comeback", title: "Resilient Pivot", description: "Recover a broken streak and rebuild to 7 days", icon: "🔄", requirement: "Restart + 7 days" },
  { badgeId: "xp_5000", title: "Master Architect", description: "Accumulate 5,000 total habit XP points", icon: "⚡", requirement: "5,000 total XP" },
  { badgeId: "diversity", title: "Full Spectrum", description: "Execute habits across 5 distinct categories", icon: "🌈", requirement: "5 categories" },
];

export default function AchievementsPage() {
  const unlockedIds = new Set(mockAchievements.map((a) => a.badgeId));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-6xl mx-auto space-y-6 pb-12"
    >
      {/* ── Page Header ── */}
      <motion.div variants={fadeUp} className="dev-card p-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-text-primary flex items-center gap-2.5">
            <Trophy size={20} className="text-amber-500" />
            <span>Achievement Protocols</span>
          </h1>
          <p className="text-xs font-medium text-text-muted mt-1">
            {mockAchievements.length} OF {allBadges.length} BADGES UNLOCKED · LEVEL REWARD MATRIX
          </p>
        </div>
        <span className="badge-brand text-[10px] font-medium uppercase hidden sm:inline-block">
          ● VERIFIED REWARDS
        </span>
      </motion.div>

      {/* ── Stats Metric Cards ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
        <div className="dev-card p-4 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-brand-500">
            {mockAchievements.length}
          </p>
          <p className="text-[11px] font-medium text-text-muted mt-1 uppercase">Unlocked</p>
        </div>
        <div className="dev-card p-4 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-text-muted">
            {allBadges.length - mockAchievements.length}
          </p>
          <p className="text-[11px] font-medium text-text-muted mt-1 uppercase">Locked</p>
        </div>
        <div className="dev-card p-4 sm:p-5 text-center">
          <p className="text-2xl sm:text-3xl font-bold text-emerald-500">
            {Math.round((mockAchievements.length / allBadges.length) * 100)}%
          </p>
          <p className="text-[11px] font-medium text-text-muted mt-1 uppercase">Completion</p>
        </div>
      </motion.div>

      {/* ── Badges Grid ── */}
      <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allBadges.map((badge) => {
          const unlocked = unlockedIds.has(badge.badgeId);
          return (
            <motion.div
              key={badge.badgeId}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className={`dev-card p-5 flex flex-col items-center text-center justify-between transition-all ${
                unlocked
                  ? "border-brand-200 dark:border-brand-500/30 hover:shadow-card-hover"
                  : "opacity-50 grayscale"
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-3 border ${
                    unlocked
                      ? "bg-brand-50 dark:bg-brand-500/15 border-brand-200 dark:border-brand-500/30 shadow-sm"
                      : "bg-surface-hover border-border"
                  }`}
                >
                  {badge.icon}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-text-primary leading-tight">
                  {badge.title}
                </h3>
                <p className="text-[11px] text-text-muted mt-1 leading-normal">
                  {badge.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border w-full">
                {unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                    <Sparkles size={11} />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-text-muted">
                    <Lock size={10} />
                    <span>{badge.requirement}</span>
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
