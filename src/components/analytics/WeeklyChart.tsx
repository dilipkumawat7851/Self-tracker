"use client";

import { motion } from "framer-motion";
import type { WeeklyStat } from "@/lib/types";
import { BarChart3 } from "lucide-react";

interface WeeklyChartProps {
  data: WeeklyStat[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxVal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="dev-card p-5 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-brand-500" />
            <h3 className="section-title text-sm">Weekly Protocol Completion</h3>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Total habits completed per day this cycle
          </p>
        </div>
        <span className="badge text-[10px] text-cyan-600 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10">
          CYCLE METRICS
        </span>
      </div>

      <div className="flex items-end gap-2 sm:gap-4 h-44 pt-2">
        {data.map((day, i) => {
          const heightPct = maxVal > 0 ? (day.completed / maxVal) * 100 : 0;
          const bgHeightPct = maxVal > 0 ? (day.total / maxVal) * 100 : 0;
          const isToday = i === (new Date().getDay() + 6) % 7; // Monday = 0

          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-medium text-text-muted group-hover:text-text-primary transition-colors">
                {day.completed}/{day.total}
              </span>

              <div className="relative w-full max-w-[34px] h-32 rounded-lg bg-surface-hover border border-border overflow-hidden flex items-end">
                {/* Background ghost track */}
                <div
                  className="w-full bg-black/[0.03] dark:bg-white/[0.04]"
                  style={{ height: `${bgHeightPct}%` }}
                />

                {/* Animated active bar */}
                <motion.div
                  className="absolute bottom-0 w-full rounded-md"
                  style={{
                    background: isToday
                      ? "linear-gradient(to top, #4F6AF6, #6580FF)"
                      : "linear-gradient(to top, rgba(79,106,246,0.5), rgba(101,128,255,0.5))",
                    boxShadow: isToday ? "0 0 12px rgba(79,106,246,0.25)" : "none",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: "easeOut" }}
                />
              </div>

              <span
                className={`text-[11px] font-medium ${
                  isToday ? "text-brand-500 font-bold" : "text-text-muted"
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
