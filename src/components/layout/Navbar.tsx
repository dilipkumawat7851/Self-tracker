"use client";

import { useSession, signOut } from "next-auth/react";
import { getGreeting, calculateLevel, xpProgress } from "@/lib/utils";
import LiveClock from "@/components/ui/LiveClock";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LogOut } from "lucide-react";

interface NavbarProps {
  userName?: string;
  xp?: number;
}

export default function Navbar({ userName, xp = 1450 }: NavbarProps) {
  const { data: session } = useSession();
  const displayName = userName || session?.user?.name?.split(" ")[0] || "Friend";
  const level = calculateLevel(xp);
  const progress = xpProgress(xp);
  const greeting = getGreeting();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 md:px-8 h-16 border-b border-surface-900/10 dark:border-white/[0.04] bg-white/60 dark:bg-surface-950/60 backdrop-blur-xl">
      {/* Left — Greeting */}
      <div>
        <p className="text-sm text-zinc-500 dark:text-surface-200/50">{greeting},</p>
        <p className="text-base font-semibold -mt-0.5">{displayName} 👋</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 sm:gap-5">
        <LiveClock />
        <ThemeToggle />
        {/* XP Progress */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-surface-200/50">Level {level}</p>
            <p className="text-xs font-semibold text-brand-400">{xp} XP</p>
          </div>
          <div className="w-24 h-2 bg-zinc-200 dark:bg-surface-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-all duration-200"
          title="Log out"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-sm font-bold text-white">
          {displayName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
