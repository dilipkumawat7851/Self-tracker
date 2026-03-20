"use client";

import { getGreeting, calculateLevel, xpProgress } from "@/lib/utils";

interface NavbarProps {
  userName?: string;
  xp?: number;
}

export default function Navbar({ userName = "Dilip", xp = 1450 }: NavbarProps) {
  const level = calculateLevel(xp);
  const progress = xpProgress(xp);
  const greeting = getGreeting();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-8 h-16 border-b border-white/[0.04] bg-surface-950/60 backdrop-blur-xl">
      {/* Left — Greeting */}
      <div>
        <p className="text-sm text-surface-200/50">{greeting},</p>
        <p className="text-base font-semibold -mt-0.5">{userName} 👋</p>
      </div>

      {/* Right — XP & Level */}
      <div className="flex items-center gap-5">
        {/* XP Progress */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-surface-200/50">Level {level}</p>
            <p className="text-xs font-semibold text-brand-400">{xp} XP</p>
          </div>
          <div className="w-24 h-2 bg-surface-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-bold">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
