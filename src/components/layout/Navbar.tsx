"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface NavbarProps {
  userName?: string;
  xp?: number;
}

export default function Navbar({ userName }: NavbarProps) {
  const { data: session } = useSession();
  const displayName = userName || session?.user?.name?.split(" ")[0] || "Dilip";
  
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-20 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      
      {/* Left spacer for mobile button */}
      <div className="w-10 md:hidden" />

      {/* Center Search Bar */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative w-full">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 text-xs md:text-[13px] rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 focus:border-[#6366F1] focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-[#6366F1]/20 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 md:gap-4 ml-4">
        
        {/* Day / Night Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === "dark" ? "Switch to Day Mode" : "Switch to Night Mode"}
            aria-label="Toggle Day / Night Mode"
          >
            {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>
        )}

        {/* Notification Bell */}
        <button 
          className="relative flex items-center justify-center w-9 h-9 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#EF4444]" />
        </button>

        {/* User Pill / Avatar */}
        <div className="flex items-center gap-2 pl-1 cursor-pointer hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:inline text-[13px] font-semibold text-slate-700 dark:text-slate-200">
            {displayName}
          </span>
          <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
        </div>
      </div>
    </header>
  );
}
