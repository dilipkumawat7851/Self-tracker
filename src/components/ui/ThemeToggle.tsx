"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-xl bg-surface border border-border animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary border border-border hover:border-border-hover transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Theme: ${isDark ? "Dark" : "Light"} (click to toggle)`}
    >
      {isDark ? (
        <Sun size={16} className="text-amber-400" />
      ) : (
        <Moon size={16} className="text-brand-500" />
      )}
    </motion.button>
  );
}
