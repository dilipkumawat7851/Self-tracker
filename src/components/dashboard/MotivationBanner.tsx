"use client";

import { motion } from "framer-motion";
import { Flame, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface MotivationBannerProps {
  pendingHabitsCount: number;
  userName: string;
}

export default function MotivationBanner({ pendingHabitsCount, userName }: MotivationBannerProps) {
  if (pendingHabitsCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="dev-card p-4 sm:p-5 flex items-center justify-between gap-4 border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/5"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-text-primary">
                All daily protocols completed, {userName}!
              </h3>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                100% SCORE
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Streak protected for today. Great focus—take time to recharge!
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-100 dark:bg-emerald-500/10">
          <Star size={13} className="fill-emerald-500/40" />
          <span>+50 XP Bonus</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="dev-card p-4 sm:p-5 flex items-center justify-between gap-4 border border-orange-200 dark:border-orange-500/25 bg-orange-50 dark:bg-orange-500/5"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 border border-orange-200 dark:border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400 flex-shrink-0">
          <Flame size={20} className="fill-orange-400/40" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-text-primary">
              Maintain Streak Momentum, {userName}
            </h3>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-500/15 text-orange-600 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30">
              {pendingHabitsCount} PENDING
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            You have <span className="text-orange-600 dark:text-orange-400 font-medium">{pendingHabitsCount}</span> pending habit{pendingHabitsCount > 1 ? "s" : ""} left today. Complete them before midnight to maintain your active streak.
          </p>
        </div>
      </div>

      <Link
        href="/dashboard/habits"
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl border border-orange-200 dark:border-orange-500/30 bg-orange-100 dark:bg-orange-500/15 hover:bg-orange-200 dark:hover:bg-orange-500/25 text-orange-600 dark:text-orange-300 transition-all active:scale-95 flex-shrink-0"
      >
        <span>Execute Now →</span>
      </Link>
    </motion.div>
  );
}
