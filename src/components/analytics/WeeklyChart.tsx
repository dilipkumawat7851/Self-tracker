"use client";

import { motion } from "framer-motion";
import type { WeeklyStat } from "@/lib/types";

interface WeeklyChartProps {
  data: WeeklyStat[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxVal = Math.max(...data.map((d) => d.total));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="section-title">Weekly Overview</h3>
          <p className="section-subtitle mt-0.5">Habits completed this week</p>
        </div>
        <span className="badge-accent">This Week</span>
      </div>

      <div className="flex items-end gap-3 h-40">
        {data.map((day, i) => {
          const heightPct = maxVal > 0 ? (day.completed / maxVal) * 100 : 0;
          const bgHeightPct = maxVal > 0 ? (day.total / maxVal) * 100 : 0;
          const isToday = i === new Date().getDay() - 1;

          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-medium text-surface-200/50">
                {day.completed}/{day.total}
              </span>
              <div className="relative w-full max-w-[36px] mx-auto" style={{ height: "100%" }}>
                {/* Background bar */}
                <div
                  className="absolute bottom-0 w-full rounded-lg bg-white/[0.03]"
                  style={{ height: `${bgHeightPct}%` }}
                />
                {/* Filled bar */}
                <motion.div
                  className="absolute bottom-0 w-full rounded-lg"
                  style={{
                    background: isToday
                      ? "linear-gradient(to top, #8b5cf6, #a78bfa)"
                      : "linear-gradient(to top, rgba(139,92,246,0.5), rgba(167,139,250,0.5))",
                    boxShadow: isToday ? "0 0 12px rgba(139,92,246,0.3)" : "none",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                />
              </div>
              <span
                className={`text-xs font-medium ${
                  isToday ? "text-brand-400" : "text-surface-200/40"
                }`}
              >
                {day.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
