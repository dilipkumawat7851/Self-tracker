"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function LiveClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-surface border border-border text-xs font-medium text-text-muted animate-pulse">
        <Clock size={13} />
        <span>--:--:--</span>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-surface border border-border text-xs font-medium text-text-secondary">
      <Clock size={13} className="text-brand-500" />
      <span className="tabular-nums">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </span>
    </div>
  );
}
