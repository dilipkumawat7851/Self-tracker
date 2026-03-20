"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Visualize your habits with heatmaps, trends, and streak analysis powered by real-time data.",
  },
  {
    icon: "🤖",
    title: "AI Coach",
    desc: "Get personalized insights, tips, and motivation from your intelligent habit coach.",
  },
  {
    icon: "🏆",
    title: "Gamification",
    desc: "Earn XP, level up, and unlock achievement badges as you build better habits.",
  },
  {
    icon: "🔥",
    title: "Streak Tracking",
    desc: "Watch your streaks grow with beautiful animations and never miss a day.",
  },
  {
    icon: "🎯",
    title: "Goal Setting",
    desc: "Set daily, weekly, and monthly targets and track your progress effortlessly.",
  },
  {
    icon: "🌙",
    title: "Dark Mode",
    desc: "Stunning dark theme designed for late-night productivity sessions.",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* ── Ambient Glow ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-brand-600/[0.07] blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.05] blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-bold font-display text-gradient">GrowthMind</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-surface-200/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it Works</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-ghost text-sm py-2 px-4">Log in</Link>
          <Link href="/dashboard" className="btn-primary text-sm py-2 px-5">Get Started</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-24 md:pt-32 md:pb-36 max-w-4xl mx-auto"
      >
        <motion.div variants={fadeUp} className="badge-brand mb-6 text-sm">
          ✨ AI-Powered Habit Tracking
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display leading-[1.1] tracking-tight text-balance"
        >
          Build Better Habits.
          <br />
          <span className="text-gradient">Grow Every Day.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg md:text-xl text-surface-200/60 max-w-2xl leading-relaxed"
        >
          Track your habits with beautiful analytics, get AI-powered coaching, and level up with gamification. The smarter way to become your best self.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
            🚀 Start Tracking Free
          </Link>
          <a href="#features" className="btn-ghost text-base px-8 py-4">
            See Features →
          </a>
        </motion.div>

        {/* ── Floating Stats ── */}
        <motion.div
          variants={fadeUp}
          className="mt-16 grid grid-cols-3 gap-6 md:gap-12"
        >
          {[
            { value: "50K+", label: "Habits Tracked" },
            { value: "98%", label: "Success Rate" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="stat-value text-gradient">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Dashboard Preview ── */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-24"
      >
        <div className="glass-card p-2 rounded-3xl overflow-hidden">
          <div className="bg-surface-900/90 rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "🔥", value: "12", label: "Day Streak", color: "text-orange-400" },
              { icon: "✅", value: "4/6", label: "Today", color: "text-accent-400" },
              { icon: "⭐", value: "1,450", label: "Total XP", color: "text-brand-400" },
              { icon: "📈", value: "87%", label: "This Week", color: "text-cyan-400" },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <span className="text-2xl">{s.icon}</span>
                <p className={`text-2xl font-bold font-display mt-2 ${s.color}`}>{s.value}</p>
                <p className="text-xs text-surface-200/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Features ── */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative z-10 max-w-6xl mx-auto px-6 pb-32"
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            Everything You Need to <span className="text-gradient">Level Up</span>
          </h2>
          <p className="mt-4 text-surface-200/50 max-w-xl mx-auto">
            A complete system designed to make habit building effortless, insightful, and fun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="glass-card-hover p-6 group cursor-default"
            >
              <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </span>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-surface-200/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── How It Works ── */}
      <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display">
            How <span className="text-gradient">GrowthMind</span> Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Create Habits", desc: "Choose from templates or create custom habits with icons, colors, and targets.", icon: "➕" },
            { step: "02", title: "Track Daily", desc: "Check off habits, write notes, and watch your streaks grow every day.", icon: "📅" },
            { step: "03", title: "Grow with AI", desc: "Get smart insights, predictions, and coaching to optimize your routine.", icon: "🧠" },
          ].map((item) => (
            <div key={item.step} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <p className="text-xs font-bold text-brand-400 tracking-widest uppercase mb-2">Step {item.step}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-surface-200/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-32">
        <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 to-cyan-500/10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Ready to Transform Your Habits?
            </h2>
            <p className="text-surface-200/50 mb-8 max-w-lg mx-auto">
              Join thousands who are using AI to build lasting habits and unlock their full potential.
            </p>
            <Link href="/dashboard" className="btn-primary text-base px-10 py-4">
              🌱 Get Started — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8 text-center text-sm text-surface-200/30">
        <p>© 2024 GrowthMind. Built with 💜 by Dilip.</p>
      </footer>
    </div>
  );
}
