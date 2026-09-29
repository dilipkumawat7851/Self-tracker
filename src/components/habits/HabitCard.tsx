"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Habit } from "@/lib/types";
import { Check, Flame } from "lucide-react";

interface HabitCardProps {
  habit: Habit;
  onComplete?: (id: string) => void;
}

export default function HabitCard({ habit, onComplete }: HabitCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="dev-card p-4 sm:p-5 flex items-start justify-between gap-3 group hover:shadow-card-hover transition-shadow"
    >
      {/* Icon + Habit Details */}
      <div className="flex items-start gap-3.5 min-w-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 border transition-transform duration-200 group-hover:scale-105"
          style={{
            backgroundColor: `${habit.color}14`,
            borderColor: `${habit.color}28`,
          }}
        >
          {habit.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-text-primary truncate">
              {habit.name}
            </h3>
            {habit.completedToday && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25">
                DONE
              </span>
            )}
          </div>

          <p className="text-xs text-text-secondary mt-0.5 truncate leading-normal">
            {habit.description || "Daily personal development ritual"}
          </p>

          {/* Streaks & Target Days */}
          <div className="flex items-center gap-3 mt-2.5 text-xs">
            <span className="flex items-center gap-1 text-orange-500 dark:text-orange-400 font-medium">
              <Flame size={12} className="fill-orange-400/40" />
              <span>{habit.streak}d streak</span>
            </span>
            <span className="text-text-muted text-[11px]">
              Target: {habit.targetDays || 7}d/wk
            </span>
            {habit.longestStreak > 0 && (
              <span className="text-text-muted text-[11px] hidden sm:inline">
                Record: {habit.longestStreak}d
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Checkmark Complete Button */}
      <button
        onClick={() => onComplete?.(habit.id)}
        className={cn(
          "w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5 active:scale-90",
          habit.completedToday
            ? "border-emerald-300 dark:border-emerald-500/50 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 shadow-sm"
            : "border-border hover:border-brand-300 dark:hover:border-brand-400/60 bg-surface-hover/60 hover:bg-brand-50 dark:hover:bg-brand-500/10 text-text-muted hover:text-brand-500 dark:hover:text-brand-300"
        )}
        aria-label={habit.completedToday ? "Completed today" : "Mark as completed"}
        title={habit.completedToday ? "Completed" : "Complete habit"}
      >
        {habit.completedToday ? (
          <Check size={16} strokeWidth={2.5} />
        ) : (
          <div className="w-2 h-2 rounded-full bg-border-hover group-hover:bg-brand-500 transition-colors" />
        )}
      </button>
    </motion.div>
  );
}
