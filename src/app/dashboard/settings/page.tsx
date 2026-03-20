"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SettingsPage() {
  const [name, setName] = useState("Dilip Kumawat");
  const [email, setEmail] = useState("dilip@example.com");
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState("09:00");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-2xl space-y-8"
    >
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold font-display">Settings</h1>
        <p className="text-sm text-surface-200/50 mt-1">Manage your account and preferences</p>
      </motion.div>

      {/* ── Profile ── */}
      <motion.div variants={fadeUp} className="glass-card p-6 space-y-5">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>👤</span> Profile
        </h3>

        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-2xl font-bold">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-surface-200/50 mb-1.5 block">
              Display Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-surface-200/50 mb-1.5 block">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
      </motion.div>

      {/* ── Notifications ── */}
      <motion.div variants={fadeUp} className="glass-card p-6 space-y-5">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>🔔</span> Notifications
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-xs text-surface-200/40">Get reminded about your habits</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-7 rounded-full transition-all duration-300 ${
              notifications ? "bg-brand-600" : "bg-surface-700"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                notifications ? "ml-6" : "ml-1"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="text-xs font-medium text-surface-200/50 mb-1.5 block">
            Daily Reminder Time
          </label>
          <input
            type="time"
            value={dailyReminder}
            onChange={(e) => setDailyReminder(e.target.value)}
            className="input-field max-w-[200px]"
          />
        </div>
      </motion.div>

      {/* ── App Info ── */}
      <motion.div variants={fadeUp} className="glass-card p-6 space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span>ℹ️</span> About
        </h3>
        <div className="text-sm text-surface-200/50 space-y-1">
          <p>GrowthMind v0.1.0</p>
          <p>Built by Dilip Kumawat</p>
          <p>Next.js 14 · TailwindCSS · Framer Motion</p>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={fadeUp}>
        <button onClick={handleSave} className="btn-primary text-sm px-8 py-3">
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </motion.div>
    </motion.div>
  );
}
