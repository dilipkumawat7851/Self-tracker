"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  value,
  size = 72,
  strokeWidth = 6,
  color = "#4F6AF6",
  label,
  sublabel,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-brand-100 dark:text-white/10"
            strokeWidth={strokeWidth}
          />
          {/* Progress Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 4px ${color}44)`,
            }}
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-text-primary">
            {Math.round(clampedValue)}%
          </span>
        </div>
      </div>

      {label && <p className="text-xs font-medium text-text-primary mt-2">{label}</p>}
      {sublabel && <p className="text-[11px] text-text-muted mt-0.5">{sublabel}</p>}
    </div>
  );
}
