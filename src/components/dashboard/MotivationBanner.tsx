"use client";

import { motion } from "framer-motion";
import { Flame, Star, Zap } from "lucide-react";

interface MotivationBannerProps {
  pendingHabitsCount: number;
  userName: string;
}

export default function MotivationBanner({ pendingHabitsCount, userName }: MotivationBannerProps) {
  // Simple check for how many habits are left to do today
  if (pendingHabitsCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-accent-500/20 to-brand-500/10 border border-accent-500/20 mb-6"
      >
        <div className="p-3 bg-accent-500 rounded-xl text-white shadow-lg shadow-accent-500/30">
          <Star size={24} fill="currentColor" />
        </div>
        <div>
          <h3 className="font-bold text-surface-900 dark:text-white">Perfect Day, {userName}! 🎉</h3>
          <p className="text-sm text-surface-600 dark:text-surface-300">
            You've completed all your habits for today. Take a moment to relax—you earned it!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 mb-6"
    >
      <div className="p-3 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/30">
        <Flame size={24} fill="currentColor" />
      </div>
      <div>
        <h3 className="font-bold text-surface-900 dark:text-white">Keep the fire burning! 🔥</h3>
        <p className="text-sm text-surface-600 dark:text-surface-300">
          Hey {userName}, you still have <span className="font-bold text-amber-600 dark:text-amber-400">{pendingHabitsCount}</span> task{pendingHabitsCount > 1 ? 's' : ''} left today. Complete them now to protect your streak!
        </p>
      </div>
      <button className="ml-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-lg shadow-md transition-colors hidden sm:block">
        Do it now!
      </button>
    </motion.div>
  );
}
