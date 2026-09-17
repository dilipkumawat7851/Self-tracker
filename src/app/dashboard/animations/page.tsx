"use client";

import React from "react";
import { motion } from "framer-motion";
import DemoCard from "@/components/demo/DemoCard";
import { Sparkles, Cpu, Gauge, Layers } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/motion/motion-variants";

export default function AnimationsLabPage() {
  const demos = [
    {
      category: "DYNAMIC TWEENS",
      title: "Dynamic Tweens & Springs",
      description: "Demonstrate different animation behaviors with real-time pointer magnetic physics",
      animationType: "dynamic" as const,
      defaultMode: "dynamic" as const,
      accentColor: "#4F6AF6",
    },
    {
      category: "OVERWRITE MODES",
      title: "Overwrite: true vs 'auto'",
      description: "Inspect how conflicting tweens cancel, redirect, or dynamically blend",
      animationType: "overwrite" as const,
      defaultMode: "true" as const,
      accentColor: "#06b6d4",
    },
    {
      category: "GESTURE PHYSICS",
      title: "Magnetic Force & Velocity",
      description: "Physical acceleration, spring damping, and momentum preservation on release",
      animationType: "magnetic" as const,
      defaultMode: "auto" as const,
      accentColor: "#ec4899",
    },
    {
      category: "STATE TRANSITIONS",
      title: "Layout Morph & Stagger",
      description: "Hardware-accelerated layout transitions without layout re-computation penalties",
      animationType: "stagger" as const,
      defaultMode: "false" as const,
      accentColor: "#10b981",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto space-y-8 pb-12"
    >
      {/* Header Banner */}
      <motion.div variants={fadeUp} className="dev-card p-6 md:p-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-brand text-xs">Interactive Engine</span>
            <span className="text-xs text-text-muted">•</span>
            <span className="text-xs font-medium text-emerald-500">GPU Accelerated</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-text-primary flex items-center gap-3">
            <span>Interactive Motion Lab</span>
            <Sparkles size={24} className="text-brand-500" />
          </h1>

          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            Test and inspect GrowthMind&apos;s reusable physics engine. Switch between <code className="text-brand-500 font-mono text-xs">dynamic</code>, <code className="text-brand-500 font-mono text-xs">false</code>, <code className="text-brand-500 font-mono text-xs">true</code>, and <code className="text-brand-500 font-mono text-xs">auto</code> overwrite modes, trigger tweens in real time, and click <code className="text-brand-500 font-mono text-xs">&lt;/&gt;</code> to inspect live executable Framer Motion code.
          </p>
        </div>

        {/* Engine Metric Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-white/5 border border-brand-200 dark:border-white/10 flex items-center justify-center text-brand-500">
              <Cpu size={16} />
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Target FPS</p>
              <p className="text-sm font-semibold text-text-primary">60.0 FPS</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-white/5 border border-cyan-200 dark:border-white/10 flex items-center justify-center text-cyan-500">
              <Gauge size={16} />
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Spring Curve</p>
              <p className="text-sm font-semibold text-text-primary">RK4 Solver</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-white/5 border border-emerald-200 dark:border-white/10 flex items-center justify-center text-emerald-500">
              <Layers size={16} />
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Transforms</p>
              <p className="text-sm font-semibold text-text-primary">Zero Reflow</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-white/5 border border-pink-200 dark:border-white/10 flex items-center justify-center text-pink-500">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Library</p>
              <p className="text-sm font-semibold text-text-primary">Motion 11.0</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Responsive Grid: Desktop: 2 columns, Tablet: 2 columns, Mobile: 1 column */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {demos.map((demo) => (
          <DemoCard
            key={demo.title}
            category={demo.category}
            title={demo.title}
            description={demo.description}
            animationType={demo.animationType}
            defaultMode={demo.defaultMode}
            accentColor={demo.accentColor}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
