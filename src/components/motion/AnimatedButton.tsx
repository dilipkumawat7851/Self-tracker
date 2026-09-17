"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "code";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  glow?: boolean;
}

export default function AnimatedButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  glow = false,
  ...props
}: AnimatedButtonProps) {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-sm hover:shadow-glow border border-brand-400/20",
    secondary:
      "bg-surface text-text-primary border border-border hover:border-border-hover hover:bg-surface-hover",
    accent:
      "bg-gradient-to-r from-accent-500 to-emerald-600 text-white shadow-sm hover:shadow-glow-accent border border-accent-400/20",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border",
    code:
      "bg-surface font-mono text-xs text-text-secondary hover:text-brand-300 border border-border hover:border-brand-500/30 hover:bg-surface-hover",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none",
        sizeStyles[size],
        variantStyles[variant],
        glow && "shadow-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
