"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sunrise, Moon } from "lucide-react";

export default function HawaMahalHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full h-[300px] md:h-[400px] rounded-[24px] overflow-hidden group shadow-sm border border-border"
    >
      {/* Background Image with Day/Night Filters */}
      <div className="absolute inset-0 z-0 bg-background">
        <Image
          src="/hawa-mahal.jpg"
          alt="Hawa Mahal"
          fill
          className="object-cover transition-all duration-1000 ease-in-out
                     /* Day Mode (Light) */
                     brightness-110 contrast-100 saturate-100
                     /* Night Mode (Dark) - Black and White */
                     dark:grayscale dark:brightness-[0.6] dark:contrast-[1.1]"
          priority
        />
        
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent dark:from-black/90 dark:via-black/50" />
      </div>

      {/* Sun/Moon Icon */}
      <div className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/20 dark:bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/30 dark:border-white/10 transition-colors duration-500">
        <Sunrise className="w-6 h-6 text-yellow-300 block dark:hidden animate-pulse-slow" />
        <Moon className="w-6 h-6 text-blue-200 hidden dark:block" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-md tracking-tight">
          Your Goals
        </h2>
        <p className="text-white/80 text-sm md:text-base max-w-xl font-medium drop-shadow-sm">
          "Like the Hawa Mahal, build your life with intricate care, strong foundations, and beautiful vision."
        </p>
      </div>

      {/* Dark Mode Artificial Window Lights (Only visible in dark mode) */}
      <div className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-1000 mix-blend-screen pointer-events-none">
        {/* We can simulate lights by placing radial gradients in the center area where the windows are */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent blur-2xl" />
      </div>
    </motion.div>
  );
}
