"use client";

import { cn } from "@/lib/utils";
import type { HeatmapDay } from "@/lib/types";

interface HabitHeatmapProps {
  data: HeatmapDay[];
}

const levelColors = [
  "bg-white/[0.03]",
  "bg-brand-500/20",
  "bg-brand-500/40",
  "bg-brand-500/60",
  "bg-brand-500/90",
];

export default function HabitHeatmap({ data }: HabitHeatmapProps) {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="section-title">Activity Heatmap</h3>
          <p className="section-subtitle mt-0.5">Last 16 weeks of habit activity</p>
        </div>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "w-[14px] h-[14px] rounded-[3px] transition-colors duration-200",
                  levelColors[day.level]
                )}
                title={`${day.date}: ${day.count} habits`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 text-xs text-surface-200/40">
        <span>Less</span>
        {levelColors.map((c, i) => (
          <div key={i} className={cn("w-3 h-3 rounded-sm", c)} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
