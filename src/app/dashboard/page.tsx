"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HabitCard from "@/components/habits/HabitCard";
import ProgressRing from "@/components/ui/ProgressRing";
import WeeklyChart from "@/components/analytics/WeeklyChart";
import AIInsightPanel from "@/components/dashboard/AIInsightPanel";
import { mockHabits, mockWeeklyStats, mockInsights } from "@/lib/mock-data";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DashboardPage() {
  const [habits, setHabits] = useState(mockHabits);

  const totalToday = habits.length;
  const completedToday = habits.filter((h) => h.completedToday).length;
  const pct = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const bestStreak = Math.max(...habits.map((h) => h.streak));

  const handleComplete = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak - 1 : h.streak + 1 }
          : h
      )
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="space-y-8 max-w-7xl"
    >
      {/* ── Stats Row ── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: "✅", value: `${completedToday}/${totalToday}`, label: "Today's Progress", color: "text-accent-400" },
          { icon: "🔥", value: bestStreak.toString(), label: "Best Streak", color: "text-orange-400" },
          { icon: "⭐", value: "1,450", label: "Total XP", color: "text-brand-400" },
          { icon: "📈", value: `${pct}%`, label: "Completion Rate", color: "text-cyan-400" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center text-xl">
              {stat.icon}
            </div>
            <div>
              <p className={`text-xl font-bold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-surface-200/40">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Today's Habits */}
        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="section-title">Today&apos;s Habits</h2>
              <p className="section-subtitle">Complete your daily habits to earn XP</p>
            </div>
            <ProgressRing value={pct} size={64} strokeWidth={5} />
          </div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onComplete={handleComplete} />
            ))}
          </motion.div>
        </motion.div>

        {/* Right — AI Insights */}
        <motion.div variants={fadeUp}>
          <AIInsightPanel insights={mockInsights} />
        </motion.div>
      </div>

      {/* ── Weekly Chart ── */}
      <motion.div variants={fadeUp}>
        <WeeklyChart data={mockWeeklyStats} />
      </motion.div>
    </motion.div>
  );
}
