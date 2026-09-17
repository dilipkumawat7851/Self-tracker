"use client";

import { cn } from "@/lib/utils";
import type { HeatmapDay } from "@/lib/types";
import { Activity } from "lucide-react";

interface HabitHeatmapProps {
  data: HeatmapDay[];
}

const levelColors = [
  "bg-surface-hover border-border",
  "bg-brand-100 dark:bg-brand-500/25 border-brand-200 dark:border-brand-500/35",
  "bg-brand-300 dark:bg-brand-500/50 border-brand-400 dark:border-brand-500/60",
  "bg-brand-400 dark:bg-brand-500/75 border-brand-500 dark:border-brand-500/85",
  "bg-brand-500 border-brand-600 dark:border-brand-300 shadow-sm",
];

export default function HabitHeatmap({ data }: HabitHeatmapProps) {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="dev-card p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-brand-500" />
            <h3 className="section-title text-sm">Consistency Heatmap Matrix</h3>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Historical activity across the last 16 weeks (112 days)
          </p>
        </div>
        <span className="text-xs font-medium text-text-muted">16 WEEKS</span>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[4px] min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[4px]">
              {week.map((day) => (
                <div
                  key={day.date}
                  className={cn(
                    "w-[13px] h-[13px] rounded-[3px] border transition-transform hover:scale-125 hover:z-10",
                    levelColors[day.level]
                  )}
                  title={`${day.date}: ${day.count} habits completed`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-[11px] font-medium text-text-muted">
        <span>Daily completion intensity</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {levelColors.map((c, i) => (
            <div key={i} className={cn("w-3 h-3 rounded-[2px] border", c)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
