"use client";

import { motion } from "framer-motion";
import WeeklyChart from "@/components/analytics/WeeklyChart";
import HabitHeatmap from "@/components/analytics/HabitHeatmap";
import ProgressRing from "@/components/ui/ProgressRing";
import { mockWeeklyStats, mockHeatmapData, mockHabits } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AnalyticsPage() {
  const totalCompleted = mockWeeklyStats.reduce((sum, d) => sum + d.completed, 0);
  const totalPossible = mockWeeklyStats.reduce((sum, d) => sum + d.total, 0);
  const weeklyPct = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="max-w-6xl space-y-8"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold font-display">Analytics</h1>
        <p className="text-sm text-surface-200/50 mt-1">
          Deep insights into your habit performance
        </p>
      </motion.div>

      {/* ── Summary Cards ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-card p-6 flex items-center gap-5">
          <ProgressRing value={weeklyPct} size={80} strokeWidth={6} color="#8b5cf6" />
          <div>
            <p className="text-sm text-surface-200/50">Weekly Score</p>
            <p className="text-2xl font-bold font-display text-brand-400">{weeklyPct}%</p>
          </div>
        </div>

        <div className="glass-card p-6">
          <p className="text-sm text-surface-200/50">Total Completions</p>
          <p className="text-3xl font-bold font-display text-accent-400 mt-1">{totalCompleted}</p>
          <p className="text-xs text-surface-200/40 mt-1">out of {totalPossible} this week</p>
        </div>

        <div className="glass-card p-6">
          <p className="text-sm text-surface-200/50">Active Habits</p>
          <p className="text-3xl font-bold font-display text-cyan-400 mt-1">
            {mockHabits.filter((h) => h.isActive).length}
          </p>
          <p className="text-xs text-surface-200/40 mt-1">Currently tracking</p>
        </div>
      </motion.div>

      {/* ── Weekly Chart ── */}
      <motion.div variants={fadeUp}>
        <WeeklyChart data={mockWeeklyStats} />
      </motion.div>

      {/* ── Heatmap ── */}
      <motion.div variants={fadeUp}>
        <HabitHeatmap data={mockHeatmapData} />
      </motion.div>

      {/* ── Per-Habit Breakdown ── */}
      <motion.div variants={fadeUp} className="glass-card p-6">
        <h3 className="section-title mb-4">Habit Breakdown</h3>
        <div className="space-y-4">
          {mockHabits.map((habit) => {
            const pct = habit.targetDays > 0 ? Math.round((habit.streak / habit.targetDays) * 100) : 0;
            return (
              <div key={habit.id} className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: `${habit.color}15` }}
                >
                  {habit.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-medium">{habit.name}</p>
                    <span className="text-xs text-surface-200/40">{habit.streak} / {habit.targetDays} days</span>
                  </div>
                  <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: habit.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
