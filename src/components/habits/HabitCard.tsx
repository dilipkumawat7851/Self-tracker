"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Habit } from "@/lib/types";

interface HabitCardProps {
  habit: Habit;
  onComplete?: (id: string) => void;
}

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HabitCard({ habit, onComplete }: HabitCardProps) {
  return (
    <motion.div
      variants={container}
      className="glass-card-hover p-5 group"
    >
      <div className="flex items-start justify-between">
        {/* Icon + Info */}
        <div className="flex items-start gap-3.5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: `${habit.color}15`, border: `1px solid ${habit.color}30` }}
          >
            {habit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-[15px] leading-tight">{habit.name}</h3>
            <p className="text-xs text-surface-200/40 mt-1 line-clamp-1">{habit.description}</p>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="flex items-center gap-1 text-xs font-medium text-orange-400">
                🔥 {habit.streak}
              </span>
              <span className="text-[10px] text-surface-200/30">
                Best: {habit.longestStreak}
              </span>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <button
          onClick={() => onComplete?.(habit.id)}
          className={cn(
            "w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1",
            habit.completedToday
              ? "border-accent-500 bg-accent-500/20 text-accent-400"
              : "border-surface-700 hover:border-brand-500/50 hover:bg-brand-500/10 text-surface-200/30 hover:text-brand-400"
          )}
          aria-label={habit.completedToday ? "Completed" : "Mark complete"}
        >
          {habit.completedToday ? "✓" : ""}
        </button>
      </div>
    </motion.div>
  );
}
