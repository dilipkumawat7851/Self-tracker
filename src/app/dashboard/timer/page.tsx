"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const MODE_CONFIG: Record<TimerMode, { label: string; minutes: number; color: string; gradient: string; emoji: string }> = {
  focus:      { label: "Focus",       minutes: 25, color: "#8b5cf6", gradient: "from-brand-500 to-brand-700", emoji: "🎯" },
  shortBreak: { label: "Short Break", minutes: 5,  color: "#10b981", gradient: "from-accent-500 to-accent-700", emoji: "☕" },
  longBreak:  { label: "Long Break",  minutes: 15, color: "#06b6d4", gradient: "from-cyan-500 to-cyan-700",    emoji: "🧘" },
};

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODE_CONFIG.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const config = MODE_CONFIG[mode];
  const totalSeconds = config.minutes * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Timer tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === "focus") {
        setSessions((prev) => prev + 1);
      }
      // Play a gentle notification sound
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        osc.type = "sine";
        gain.gain.value = 0.3;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
        osc.stop(ctx.currentTime + 1.5);
      } catch {}
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  const switchMode = useCallback((newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODE_CONFIG[newMode].minutes * 60);
  }, []);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  // SVG circle math
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-xl">
          ⏱️
        </div>
        <div>
          <h1 className="text-xl font-bold font-display">Focus Timer</h1>
          <p className="text-xs text-zinc-500 dark:text-surface-200/40">
            Pomodoro technique · Stay productive
          </p>
        </div>
      </motion.div>

      {/* Mode Switcher */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 bg-zinc-100 dark:bg-surface-900/80 rounded-xl p-1.5"
      >
        {(Object.keys(MODE_CONFIG) as TimerMode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              mode === m
                ? "bg-white dark:bg-white/10 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-surface-200/40 hover:text-zinc-900 dark:hover:text-surface-200/60"
            }`}
          >
            {MODE_CONFIG[m].emoji} {MODE_CONFIG[m].label}
          </button>
        ))}
      </motion.div>

      {/* Timer Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="relative w-[340px] h-[340px] flex items-center justify-center"
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full blur-[60px] opacity-20 transition-colors duration-500"
          style={{ backgroundColor: config.color }}
        />

        {/* SVG Ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 320 320"
        >
          {/* Track */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            className="stroke-zinc-200 dark:stroke-surface-800"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: `drop-shadow(0 0 12px ${config.color}66)`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ opacity: 0.6, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-7xl font-bold font-display tabular-nums tracking-tight"
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm text-zinc-500 dark:text-surface-200/40 mt-2">
            {config.emoji} {config.label} Session
          </span>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={resetTimer}
          className="btn-ghost px-5 py-3 text-sm"
        >
          🔄 Reset
        </button>
        <button
          onClick={toggleTimer}
          className="relative inline-flex items-center justify-center gap-2 px-10 py-4 font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 text-base"
          style={{
            background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
            boxShadow: isRunning ? "none" : `0 8px 30px ${config.color}55`,
          }}
        >
          {isRunning ? "⏸ Pause" : timeLeft === totalSeconds ? "▶ Start" : "▶ Resume"}
        </button>
        <button
          onClick={() => {
            if (mode === "focus") {
              switchMode(sessionsCompleted % 4 === 3 ? "longBreak" : "shortBreak");
            } else {
              switchMode("focus");
            }
          }}
          className="btn-ghost px-5 py-3 text-sm"
        >
          ⏭ Skip
        </button>
      </motion.div>

      {/* Session Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card px-6 py-4 w-full max-w-md"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Sessions Completed</p>
            <p className="text-xs text-zinc-500 dark:text-surface-200/40 mt-0.5">
              Every 4 focus sessions → long break
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i < (sessionsCompleted % 4)
                    ? "bg-brand-500 shadow-glow scale-110"
                    : "bg-zinc-200 dark:bg-surface-800"
                }`}
              />
            ))}
            <span className="ml-3 text-2xl font-bold font-display text-brand-400">
              {sessionsCompleted}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-5 w-full max-w-md"
      >
        <p className="text-sm font-semibold mb-2">💡 Pomodoro Tips</p>
        <ul className="space-y-2 text-sm text-zinc-500 dark:text-surface-200/50">
          <li className="flex items-start gap-2">
            <span className="text-brand-400 mt-0.5">•</span>
            Focus on a single task during each session
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-400 mt-0.5">•</span>
            Take short breaks to rest your eyes and stretch
          </li>
          <li className="flex items-start gap-2">
            <span className="text-cyan-400 mt-0.5">•</span>
            After 4 sessions, take a longer 15-minute break
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
