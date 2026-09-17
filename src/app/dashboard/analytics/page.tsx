"use client";

import { motion } from "framer-motion";
import WeeklyChart from "@/components/analytics/WeeklyChart";
import HabitHeatmap from "@/components/analytics/HabitHeatmap";
import ProgressRing from "@/components/ui/ProgressRing";
import { mockWeeklyStats, mockHeatmapData, mockHabits } from "@/lib/mock-data";
import { staggerContainer, fadeUp } from "@/components/motion/motion-variants";
import { Activity, Gauge, TrendingUp, CheckCircle2 } from "lucide-react";

export default function AnalyticsPage() {
  const totalCompleted = mockWeeklyStats.reduce((sum, d) => sum + d.completed, 0);
  const totalPossible = mockWeeklyStats.reduce((sum, d) => sum + d.total, 0);
  const weeklyPct = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

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
          <h1 className="text-xl md:text-2xl font-bold font-display text-text-primary">
            Performance Analytics
          </h1>
          <p className="text-xs font-medium text-text-muted mt-1">
            STATISTICAL TRENDS · HEATMAP MATRIX · VECTOR EFFICIENCY
          </p>
        </div>
        <span className="badge-brand text-[10px] font-medium uppercase hidden sm:inline-block">
          ● REAL-TIME AGGREGATION
        </span>
      </motion.div>

      {/* ── Metric Summary Cards ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dev-card p-5 flex items-center gap-5">
          <ProgressRing value={weeklyPct} size={70} strokeWidth={6} color="#4F6AF6" />
          <div>
            <span className="text-[11px] font-medium text-text-muted uppercase">Cycle Efficiency</span>
            <p className="text-2xl font-bold text-brand-500 mt-0.5">{weeklyPct}%</p>
            <p className="text-[11px] text-text-muted mt-0.5">7-day rolling window</p>
          </div>
        </div>

        <div className="dev-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-text-muted uppercase">Total Executions</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-emerald-500 mt-1">{totalCompleted}</p>
          <p className="text-[11px] text-text-muted mt-1">
            out of {totalPossible} planned this week
          </p>
        </div>

        <div className="dev-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-text-muted uppercase">Active Vectors</span>
            <TrendingUp size={16} className="text-cyan-500" />
          </div>
          <p className="text-3xl font-bold text-cyan-500 mt-1">
            {mockHabits.filter((h) => h.isActive).length}
          </p>
          <p className="text-[11px] text-text-muted mt-1">
            Simultaneously monitored routines
          </p>
        </div>
      </motion.div>

      {/* ── Weekly Performance Chart ── */}
      <motion.div variants={fadeUp}>
        <WeeklyChart data={mockWeeklyStats} />
      </motion.div>

      {/* ── Heatmap Matrix ── */}
      <motion.div variants={fadeUp}>
        <HabitHeatmap data={mockHeatmapData} />
      </motion.div>

      {/* ── Per-Habit Breakdown ── */}
      <motion.div variants={fadeUp} className="dev-card p-5 md:p-6">
        <h3 className="section-title text-sm mb-4">Protocol Velocity Breakdown</h3>
        <div className="space-y-4">
          {mockHabits.map((habit) => {
            const pct = habit.targetDays > 0 ? Math.round((habit.streak / habit.targetDays) * 100) : 0;
            return (
              <div key={habit.id} className="p-3 rounded-xl border border-border bg-surface-hover/30 hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-3.5 mb-2">
                  <span className="text-xl">{habit.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-text-primary truncate">
                        {habit.name}
                      </span>
                      <span className="text-xs text-text-muted">
                        {habit.streak} / {habit.targetDays} days ({Math.min(pct, 100)}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-brand-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: habit.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
