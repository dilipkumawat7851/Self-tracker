"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Play,
  ArrowRight,
  Target,
  BarChart2,
  Activity,
  Smile
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-text-primary overflow-hidden font-sans selection:bg-brand-500/30 transition-colors duration-300">
      {/* ── Background Image with Overlay ── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out
                     /* Day Mode (Light) */
                     opacity-50 brightness-110
                     /* Night Mode (Dark) - Black and White */
                     dark:opacity-100 dark:grayscale dark:brightness-[0.6] dark:contrast-[1.1]"
          style={{ backgroundImage: 'url("/hawa-mahal.jpg")' }}
        />
        {/* Gradients that adapt to theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent dark:from-background/80 dark:via-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent dark:from-background/80" />
      </div>

      {/* ── Top Header Navbar ── */}
      <header className="relative z-30 px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-brand-500 dark:text-white transition-colors">
            <BarChart2 size={24} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            SelfTracker
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-text-muted">
          <a href="#" className="text-brand-500 dark:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-text-primary transition-colors">About</a>
          <a href="#" className="hover:text-text-primary transition-colors">Contact</a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-5 py-2 rounded-full border border-border text-[13px] font-medium text-text-primary hover:bg-surface-hover transition-all"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2 rounded-full bg-brand-500 dark:bg-white text-white dark:text-black hover:bg-brand-600 dark:hover:bg-gray-200 text-[13px] font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] dark:shadow-white/20"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ── MAIN HERO SECTION ── */}
      <section className="relative z-10 px-6 md:px-12 pt-24 pb-32 max-w-[1400px] mx-auto flex flex-col justify-center min-h-[calc(100vh-140px)]">
        
        {/* Decorative Handwritten Text */}
        <div className="absolute top-20 right-[15%] sm:right-[20%] md:right-[30%] -rotate-12 pointer-events-none opacity-80">
          <span className="font-caveat text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
            Small Steps<br />Big Results
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight mb-6 text-text-primary">
            A Better You<br />
            <span className="text-brand-500 dark:text-white transition-colors">Every Day</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-md leading-relaxed font-light">
            Track your habits, goals, mood, and progress —<br />
            build the life you want, one step at a time.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 dark:bg-white text-white dark:text-black hover:bg-brand-600 dark:hover:bg-gray-200 text-sm font-semibold transition-all shadow-[0_4px_20px_rgba(99,102,241,0.4)] dark:shadow-white/20"
            >
              Get Started <ArrowRight size={16} />
            </Link>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-text-primary hover:bg-surface-hover text-sm font-semibold transition-all backdrop-blur-sm">
              <Play size={16} className="text-text-primary" /> Watch Demo
            </button>
          </div>
        </motion.div>

        {/* ── BOTTOM FEATURES ROW ── */}
        <div className="absolute bottom-10 left-6 md:left-12 right-6 md:right-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1400px] mx-auto pt-10 border-t border-border">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 dark:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                <Target size={20} className="text-emerald-500 dark:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">Track Habits</h4>
                <p className="text-xs text-text-muted">Build consistent habits</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                <BarChart2 size={20} className="text-brand-500 dark:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">Set Goals</h4>
                <p className="text-xs text-text-muted">Turn dreams into plans</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 dark:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                <Activity size={20} className="text-purple-500 dark:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">Monitor Progress</h4>
                <p className="text-xs text-text-muted">Visualize your growth</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 dark:bg-white/10 flex items-center justify-center shrink-0 transition-colors">
                <Smile size={20} className="text-cyan-500 dark:text-white transition-colors" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-1">Better Mental Health</h4>
                <p className="text-xs text-text-muted">Be a happier you</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 md:mt-12 text-[11px] text-text-muted">
            Start your journey to a more focused, healthier, and happier you.
          </div>
        </div>

      </section>
    </div>
  );
}
