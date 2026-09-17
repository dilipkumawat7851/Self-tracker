"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for cursor follower
  const springX = useSpring(mouseX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only on client and non-touch devices
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hovered elements
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("button, a, input, [role='button'], .interactive-hover");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!mounted || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle glow follower */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 36 : 20,
          height: isHovered ? 36 : 20,
          opacity: isHovered ? 0.35 : 0.2,
          borderColor: isHovered ? "rgba(79, 106, 246, 0.5)" : "rgba(0, 0, 0, 0.15)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="rounded-full border border-black/10 dark:border-white/20 bg-brand-500/5 dark:bg-brand-500/10 backdrop-blur-[1px]"
      />

      {/* Center glowing precision dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_6px_rgba(79,106,246,0.6)]"
      />
    </div>
  );
}
