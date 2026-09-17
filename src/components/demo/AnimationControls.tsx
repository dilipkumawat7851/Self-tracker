"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Activity } from "lucide-react";

export type DemoMode = "dynamic" | "false" | "true" | "auto";

interface AnimationControlsProps {
  currentMode: DemoMode;
  onModeChange: (mode: DemoMode) => void;
  status: "IDLE" | "RUNNING" | "SETTLED" | "OVERWRITTEN";
  onTrigger?: () => void;
  onReset?: () => void;
  showTrigger?: boolean;
}

const MODES: { id: DemoMode; label: string; tooltip: string }[] = [
  { id: "dynamic", label: "dynamic", tooltip: "Smooth magnetic spring follower" },
  { id: "false", label: "false", tooltip: "Independent concurrent animations" },
  { id: "true", label: "true", tooltip: "Instant tween overwrite & redirect" },
  { id: "auto", label: "auto", tooltip: "Automatic damping calculation" },
];

export default function AnimationControls({
  currentMode,
  onModeChange,
  status,
  onTrigger,
  onReset,
  showTrigger = true,
}: AnimationControlsProps) {
  const statusColors = {
    IDLE: "text-text-muted border-border bg-surface-hover",
    RUNNING: "text-brand-500 border-brand-200 dark:border-brand-500/40 bg-brand-50 dark:bg-brand-500/10 animate-pulse",
    SETTLED: "text-emerald-500 border-emerald-200 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10",
    OVERWRITTEN: "text-amber-500 border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10",
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-border">
      {/* Segmented Mode Selector */}
      <div className="flex items-center p-1 rounded-xl bg-surface-hover border border-border">
        {MODES.map((m) => {
          const isActive = currentMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onModeChange(m.id)}
              title={m.tooltip}
              className={`relative px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeModePill"
                  className="absolute inset-0 rounded-lg bg-surface border border-border-hover shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Buttons & Status Badge */}
      <div className="flex items-center gap-2">
        {showTrigger && onTrigger && (
          <button
            onClick={onTrigger}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-primary transition-all active:scale-95"
            title="Trigger Tween"
          >
            <Play size={12} className="text-brand-500 fill-brand-500/40" />
            <span>Tween</span>
          </button>
        )}

        {onReset && (
          <button
            onClick={onReset}
            className="p-1 rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-all"
            title="Reset position"
          >
            <RotateCcw size={13} />
          </button>
        )}

        {/* Live Status indicator */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-medium ${
            statusColors[status]
          }`}
        >
          <Activity size={11} />
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}
