"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, SkipForward, Timer, Sparkles } from "lucide-react";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const MODE_CONFIG: Record<
  TimerMode,
  { label: string; minutes: number; color: string; gradient: string; emoji: string }
> = {
  focus: {
    label: "Focus",
    minutes: 25,
    color: "#4F6AF6",
    gradient: "from-brand-500 to-cyan-500",
    emoji: "🎯",
  },
  shortBreak: {
    label: "Short Break",
    minutes: 5,
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-500",
    emoji: "☕",
  },
  longBreak: {
    label: "Long Break",
    minutes: 15,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "🧘",
  },
};

export default function TimerPage() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODE_CONFIG.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const config = MODE_CONFIG[mode];
  const totalSeconds = config.minutes * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = "sine";
        gain.gain.value = 0.25;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
        osc.stop(ctx.currentTime + 1.2);
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

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-2 pb-12">
      {/* Top Header Card */}
      <div className="dev-card p-4 px-6 flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/30 flex items-center justify-center text-brand-500">
            <Timer size={16} />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary">Focus Pomodoro Engine</h1>
            <p className="text-[11px] text-text-muted">
              INTERVAL CYCLES · DEEP WORK OPTIMIZER
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-brand-500">
          <Sparkles size={12} />
          <span>{sessionsCompleted} Cycles</span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex gap-1.5 p-1 rounded-xl bg-surface-hover border border-border">
        {(Object.keys(MODE_CONFIG) as TimerMode[]).map((m) => {
          const isActive = mode === m;
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                isActive
                  ? "bg-surface text-text-primary border border-border shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {MODE_CONFIG[m].emoji} {MODE_CONFIG[m].label}
            </button>
          );
        })}
      </div>

      {/* Timer Circle */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 rounded-full blur-[70px] opacity-10 dark:opacity-15 transition-colors duration-500 pointer-events-none"
          style={{ backgroundColor: config.color }}
        />

        {/* SVG Circle */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 320 320">
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-brand-100 dark:text-white/5"
            strokeWidth="6"
          />
          <circle
            cx="160"
            cy="160"
            r={radius}
            fill="none"
            stroke={config.color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
            style={{
              filter: `drop-shadow(0 0 8px ${config.color}66)`,
            }}
          />
        </svg>

        {/* Center Numbers */}
        <div className="relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={timeLeft}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl font-mono font-bold tracking-tighter text-text-primary tabular-nums"
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          <span className="text-xs font-medium text-text-muted mt-2 uppercase tracking-wider">
            {config.emoji} {config.label} Session
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={resetTimer}
          className="p-3 text-xs rounded-xl border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-all active:scale-95"
          title="Reset timer"
        >
          <RotateCcw size={15} />
        </button>

        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white rounded-xl shadow-glow transition-all active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${config.color}, #06b6d4)`,
          }}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          <span>{isRunning ? "Pause" : timeLeft === totalSeconds ? "Start Protocol" : "Resume"}</span>
        </button>

        <button
          onClick={() => {
            if (mode === "focus") {
              switchMode(sessionsCompleted % 4 === 3 ? "longBreak" : "shortBreak");
            } else {
              switchMode("focus");
            }
          }}
          className="p-3 text-xs rounded-xl border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-all active:scale-95"
          title="Skip session"
        >
          <SkipForward size={15} />
        </button>
      </div>

      {/* Session Progress Counter */}
      <div className="dev-card p-4 px-5 w-full max-w-md flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-text-primary">Current Focus Cadence</p>
          <p className="text-[11px] text-text-muted">
            4 sessions trigger 15-minute restorative interval
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                i < (sessionsCompleted % 4)
                  ? "bg-brand-500 shadow-glow scale-110"
                  : "bg-brand-100 dark:bg-white/10"
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-bold text-brand-500">
            #{sessionsCompleted}
          </span>
        </div>
      </div>
    </div>
  );
}
