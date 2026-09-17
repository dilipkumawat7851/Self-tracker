"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { Code, Sparkles } from "lucide-react";
import AnimationControls, { DemoMode } from "./AnimationControls";
import CodePreview from "./CodePreview";

export interface DemoCardProps {
  category: string;
  title: string;
  description: string;
  animationType?: "dynamic" | "overwrite" | "magnetic" | "gesture" | "stagger";
  defaultMode?: DemoMode;
  accentColor?: string;
  codeSnippet?: Record<DemoMode, string>;
}

export default function DemoCard({
  category,
  title,
  description,
  animationType = "dynamic",
  defaultMode = "dynamic",
  accentColor = "#4F6AF6",
  codeSnippet,
}: DemoCardProps) {
  const [mode, setMode] = useState<DemoMode>(defaultMode);
  const [status, setStatus] = useState<"IDLE" | "RUNNING" | "SETTLED" | "OVERWRITTEN">("IDLE");
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);

  // Position motion values for dynamic & magnetic motion
  const objX = useMotionValue(0);
  const objY = useMotionValue(0);
  const objScale = useMotionValue(1);
  const objRotate = useMotionValue(0);

  // Spring configurations based on active mode
  const springConfigs = {
    dynamic: { stiffness: 220, damping: 18, mass: 0.1 },
    false: { stiffness: 120, damping: 28, mass: 1 },
    true: { stiffness: 500, damping: 30, mass: 0.1 },
    auto: { stiffness: 320, damping: 24, mass: 0.5 },
  };

  const currentSpring = springConfigs[mode];
  const smoothX = useSpring(objX, currentSpring);
  const smoothY = useSpring(objY, currentSpring);
  const smoothScale = useSpring(objScale, { stiffness: 400, damping: 20 });
  const smoothRotate = useSpring(objRotate, { stiffness: 300, damping: 22 });

  // Reset or re-center object
  const handleReset = () => {
    objX.set(0);
    objY.set(0);
    objScale.set(1);
    objRotate.set(0);
    setStatus("IDLE");
  };

  // Trigger animation behavior based on selected mode
  const handleTrigger = () => {
    setStatus("RUNNING");
    setClickCount((prev) => prev + 1);

    if (mode === "dynamic") {
      // Dynamic: dynamic pulse & orbital trajectory
      const angle = (clickCount + 1) * 1.4;
      const radius = 65;
      objX.set(Math.cos(angle) * radius);
      objY.set(Math.sin(angle) * radius);
      objScale.set(1.25);
      objRotate.set((clickCount + 1) * 45);

      setTimeout(() => {
        objScale.set(1);
        setStatus("SETTLED");
      }, 500);
    } else if (mode === "false") {
      // False: Non-overwriting independent animation behavior
      const targetX = (Math.random() - 0.5) * 120;
      const targetY = (Math.random() - 0.5) * 80;
      
      animate(objX, targetX, {
        duration: 1.2,
        ease: "easeInOut",
        onComplete: () => setStatus("SETTLED"),
      });
      animate(objY, targetY, {
        duration: 1.6,
        ease: "easeOut",
      });
      animate(objRotate, objRotate.get() + 90, { duration: 1.8 });
    } else if (mode === "true") {
      // True: Immediate overwrite / replacement behavior
      setStatus("OVERWRITTEN");
      const targetX = (Math.random() - 0.5) * 140;
      const targetY = (Math.random() - 0.5) * 90;
      
      // Stop running animations immediately and redirect
      objX.stop();
      objY.stop();
      objRotate.stop();

      animate(objX, targetX, {
        type: "spring",
        stiffness: 600,
        damping: 32,
        onComplete: () => setStatus("SETTLED"),
      });
      animate(objY, targetY, {
        type: "spring",
        stiffness: 600,
        damping: 32,
      });
      animate(objRotate, 0, { duration: 0.15 });
      objScale.set(0.9);
      setTimeout(() => objScale.set(1), 150);
    } else if (mode === "auto") {
      // Auto: Automatic smart damping calculation based on displacement
      const targetX = (Math.random() - 0.5) * 110;
      const targetY = (Math.random() - 0.5) * 70;
      const distance = Math.hypot(targetX - objX.get(), targetY - objY.get());
      const calculatedDamping = Math.max(16, Math.min(36, distance * 0.25));

      animate(objX, targetX, {
        type: "spring",
        stiffness: 300,
        damping: calculatedDamping,
        onComplete: () => setStatus("SETTLED"),
      });
      animate(objY, targetY, {
        type: "spring",
        stiffness: 300,
        damping: calculatedDamping,
      });
    }
  };

  // Pointer movement on stage (for dynamic magnetic reaction)
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    if (mode === "dynamic") {
      const rect = stageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.45;
      const deltaY = (e.clientY - centerY) * 0.45;

      objX.set(deltaX);
      objY.set(deltaY);
      setStatus("RUNNING");
    }
  };

  const handleStagePointerLeave = () => {
    if (mode === "dynamic") {
      objX.set(0);
      objY.set(0);
      setStatus("SETTLED");
    }
  };

  // Default code snippet for each mode if not provided
  const realCodeSnippet: Record<DemoMode, string> = codeSnippet || {
    dynamic: `// Dynamic Tweens: Magnetic Spring Follower with Velocity Smoothing
import { motion, useMotionValue, useSpring } from "framer-motion";

export function DynamicTween({ pointerX, pointerY }: { pointerX: number; pointerY: number }) {
  const x = useMotionValue(pointerX);
  const y = useMotionValue(pointerY);

  // Dynamic spring adapts acceleration smoothly to pointer vectors
  const smoothX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.1 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.1 });

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-cyan-400 shadow-glow"
    />
  );
}`,
    false: `// Overwrite: false (Independent concurrent animation tweens)
import { animate } from "framer-motion";

export function ConcurrentTween(elementX: any, elementY: any) {
  // overwrite: false allows simultaneous uncoupled animations
  animate(elementX, [0, 80, -40, 0], {
    duration: 1.4,
    ease: "easeInOut",
    repeat: Infinity,
  });

  animate(elementY, [0, -40, 40, 0], {
    duration: 1.9, // Independent period & easing curve
    ease: "linear",
    repeat: Infinity,
  });
}`,
    true: `// Overwrite: true (Immediate replacement & redirect)
import { animate } from "framer-motion";

export function OverwriteTrue(motionVal: any, target: number) {
  // Stop existing active tweens instantly before initiating new trajectory
  motionVal.stop();

  return animate(motionVal, target, {
    type: "spring",
    stiffness: 600,
    damping: 32,
    mass: 0.1,
  });
}`,
    auto: `// Overwrite: "auto" (Intelligent damping calculation based on delta)
import { animate } from "framer-motion";

export function AutoTween(valX: any, targetX: number) {
  const delta = Math.abs(targetX - valX.get());
  const dynamicDamping = Math.max(16, Math.min(36, delta * 0.25));

  return animate(valX, targetX, {
    type: "spring",
    stiffness: 300,
    damping: dynamicDamping,
  });
}`,
  };

  return (
    <div className="dev-card p-5 flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <span className="text-[10px] font-mono font-semibold tracking-wider text-brand-500 uppercase bg-brand-50 dark:bg-brand-500/10 px-2 py-0.5 rounded border border-brand-200 dark:border-brand-500/20">
            {category}
          </span>
          <h3 className="text-base font-semibold text-text-primary mt-1.5 flex items-center gap-2">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">
            {description}
          </p>
        </div>

        {/* Code Button </ > */}
        <button
          onClick={() => setIsCodeOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-border bg-surface-hover hover:bg-surface-active hover:border-brand-300 dark:hover:border-brand-500/40 text-text-secondary hover:text-text-primary transition-all active:scale-95"
          title="Inspect actual Framer Motion code"
        >
          <Code size={13} className="text-brand-500" />
          <span>&lt;/&gt;</span>
        </button>
      </div>

      {/* Large Interactive Animation Area with subtle circular/dotted radar boundary */}
      <div
        ref={stageRef}
        onPointerMove={handleStagePointerMove}
        onPointerLeave={handleStagePointerLeave}
        className="relative w-full h-52 rounded-xl bg-[#09090b] border border-white/5 overflow-hidden flex items-center justify-center select-none cursor-crosshair group/stage"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

        {/* Subtle circular boundary radar lines */}
        <div className="absolute w-44 h-44 rounded-full border border-white/[0.06] pointer-events-none" />
        <div className="absolute w-28 h-28 rounded-full border border-dashed border-white/[0.08] pointer-events-none" />
        <div className="absolute w-12 h-12 rounded-full border border-white/[0.05] pointer-events-none" />

        {/* Coordinate crosshair lines */}
        <div className="absolute inset-x-0 h-px bg-white/[0.03] pointer-events-none" />
        <div className="absolute inset-y-0 w-px bg-white/[0.03] pointer-events-none" />

        {/* Center Animated Object */}
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            scale: smoothScale,
            rotate: smoothRotate,
          }}
          onClick={handleTrigger}
          className="relative z-10 flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer shadow-lg transition-shadow duration-300"
        >
          {/* Animated Object Core */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative transition-transform duration-200"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, #06b6d4)`,
              boxShadow: `0 0 24px ${accentColor}44`,
            }}
          >
            <Sparkles size={20} className="text-white drop-shadow-md" />
            
            {/* Subtle inner reflection */}
            <div className="absolute inset-0 rounded-2xl border border-white/30 pointer-events-none" />
          </div>

          {/* Mode label tag below object */}
          <span className="mt-2 text-[10px] font-mono font-medium text-text-primary px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 uppercase tracking-wider">
            {mode}
          </span>
        </motion.div>

        {/* Interactive hint on hover */}
        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-text-muted/60 pointer-events-none">
          {mode === "dynamic" ? "• Move pointer or click" : "• Click object or tween"}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <AnimationControls
        currentMode={mode}
        onModeChange={setMode}
        status={status}
        onTrigger={handleTrigger}
        onReset={handleReset}
      />

      {/* Code Preview Modal */}
      <CodePreview
        isOpen={isCodeOpen}
        onClose={() => setIsCodeOpen(false)}
        title={`${title} (${category})`}
        code={realCodeSnippet[mode]}
        language="tsx"
        mode={mode}
      />
    </div>
  );
}
