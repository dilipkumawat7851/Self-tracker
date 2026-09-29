"use client";

import { Activity, Heart, Footprints, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function GoogleFitWidget() {
  const metrics = [
    { label: "Steps", value: "8,432", unit: "/ 10,000", icon: <Footprints size={18} />, color: "text-blue-500", bg: "bg-blue-500/10", progress: 84 },
    { label: "Heart Points", value: "45", unit: "pts", icon: <Heart size={18} />, color: "text-red-500", bg: "bg-red-500/10", progress: 65 },
    { label: "Calories", value: "1,240", unit: "kcal", icon: <Flame size={18} />, color: "text-orange-500", bg: "bg-orange-500/10", progress: 45 },
    { label: "Active Time", value: "45", unit: "min", icon: <Activity size={18} />, color: "text-green-500", bg: "bg-green-500/10", progress: 75 },
  ];

  return (
    <div className="p-6 rounded-[20px] bg-surface/60 backdrop-blur-xl border border-border/50 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
          {/* Mock Google Fit Logo */}
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm border border-border">
             <svg viewBox="0 0 24 24" className="w-full h-full">
               <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12c0 1.33.26 2.61.74 3.77L12 22l9.26-6.23c.48-1.16.74-2.44.74-3.77 0-5.52-4.48-10-10-10z" />
               <path fill="#4285F4" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
             </svg>
          </div>
          Google Fit
        </h3>
        <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">Synced just now</span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {metrics.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl bg-surface-elevated border border-border flex flex-col justify-between"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-full ${m.bg} ${m.color} flex items-center justify-center`}>
                {m.icon}
              </div>
              <span className="text-xs font-medium text-text-secondary">{m.label}</span>
            </div>
            
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-text-primary">{m.value}</span>
                <span className="text-[10px] text-text-muted">{m.unit}</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-surface-active rounded-full mt-2 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${m.bg.replace('/10', '')}`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
