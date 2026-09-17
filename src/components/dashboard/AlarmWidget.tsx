"use client";

import { useState, useEffect } from "react";
import { Clock, Bell, Settings2, Play, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlarmWidget() {
  const [time, setTime] = useState<Date | null>(null);
  const [alarmTime, setAlarmTime] = useState<string>("07:00");
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now);

      // Check alarm
      if (isAlarmActive && !isRinging) {
        const currentHours = now.getHours().toString().padStart(2, "0");
        const currentMinutes = now.getMinutes().toString().padStart(2, "0");
        if (`${currentHours}:${currentMinutes}` === alarmTime && now.getSeconds() === 0) {
          setIsRinging(true);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [alarmTime, isAlarmActive, isRinging]);

  const stopAlarm = () => {
    setIsRinging(false);
    setIsAlarmActive(false);
  };

  if (!time) {
    return (
      <div className="p-6 rounded-[20px] bg-surface border border-border shadow-sm flex items-center justify-center h-[200px] animate-pulse">
        <Clock className="w-8 h-8 text-text-muted" />
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="p-6 rounded-[20px] bg-surface/60 backdrop-blur-xl border border-border/50 shadow-sm flex flex-col relative overflow-hidden">
      <div className="flex justify-between items-center mb-6 z-10 relative">
        <h3 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
          <Clock size={16} className="text-brand-500" /> Current Time
        </h3>
        <button className="text-text-muted hover:text-text-primary transition-colors">
          <Settings2 size={16} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-5xl md:text-6xl font-bold text-text-primary tracking-tight tabular-nums flex items-baseline gap-1">
          {hours}:{minutes}
          <span className="text-xl md:text-2xl text-text-muted font-medium ml-1">
            {seconds}
          </span>
        </div>
        <p className="text-sm text-text-muted mt-2 font-medium">
          {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-border flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <Bell size={18} className={isAlarmActive ? "text-brand-500" : "text-text-muted"} />
          <input 
            type="time" 
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium text-text-primary cursor-pointer"
          />
        </div>
        
        <button 
          onClick={() => setIsAlarmActive(!isAlarmActive)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            isAlarmActive 
              ? "bg-brand-500 text-white" 
              : "bg-surface-elevated border border-border text-text-secondary hover:text-text-primary"
          }`}
        >
          {isAlarmActive ? "ON" : "OFF"}
        </button>
      </div>

      {/* Ringing Overlay */}
      <AnimatePresence>
        {isRinging && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-brand-500 flex flex-col items-center justify-center"
          >
            <motion.div 
              animate={{ rotate: [-10, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="mb-4 text-white"
            >
              <Bell size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-6">Wake Up!</h3>
            <button 
              onClick={stopAlarm}
              className="px-6 py-2 bg-white text-brand-600 rounded-full font-bold shadow-lg flex items-center gap-2"
            >
              <Square size={16} fill="currentColor" /> Stop Alarm
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
