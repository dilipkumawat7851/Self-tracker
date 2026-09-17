"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Info, Check, Save } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/motion/motion-variants";

export default function SettingsPage() {
  const [name, setName] = useState("Dilip Kumawat");
  const [email, setEmail] = useState("dilip@example.com");
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState("09:00");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-3xl mx-auto space-y-6 pb-12"
    >
      <motion.div variants={fadeUp} className="dev-card p-6">
        <h1 className="text-xl md:text-2xl font-bold font-display text-text-primary">
          System Preferences
        </h1>
        <p className="text-xs font-medium text-text-muted mt-1">
          PROFILE IDENTITY · NOTIFICATION PROTOCOLS · ENGINE TELEMETRY
        </p>
      </motion.div>

      {/* ── Profile Configuration ── */}
      <motion.div variants={fadeUp} className="dev-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <User size={16} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-text-primary">Profile Identity</h3>
        </div>

        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-brand-400 flex items-center justify-center text-xl font-bold text-white shadow-sm flex-shrink-0">
            {name.charAt(0)}
          </div>
          <div className="flex-1">
            <label className="text-[11px] font-medium text-text-muted mb-1.5 block uppercase">
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
          <label className="text-[11px] font-medium text-text-muted mb-1.5 block uppercase">
            Email Endpoint
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
      </motion.div>

      {/* ── Notifications Configuration ── */}
      <motion.div variants={fadeUp} className="dev-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Bell size={16} className="text-brand-500" />
          <h3 className="text-sm font-semibold text-text-primary">Notification Triggers</h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-text-primary">Push Notifications</p>
            <p className="text-[11px] text-text-muted">
              Dispatch streak warnings before midnight deadline
            </p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-all duration-200 relative p-0.5 ${
              notifications ? "bg-brand-500" : "bg-surface-active"
            }`}
            aria-label="Toggle notifications"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 ${
                notifications ? "ml-5" : "ml-0"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="text-[11px] font-medium text-text-muted mb-1.5 block uppercase">
            Daily Reminder Interval (Local Time)
          </label>
          <input
            type="time"
            value={dailyReminder}
            onChange={(e) => setDailyReminder(e.target.value)}
            className="input-field max-w-[160px] text-xs"
          />
        </div>
      </motion.div>

      {/* ── Telemetry & System Info ── */}
      <motion.div variants={fadeUp} className="dev-card p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-cyan-500" />
          <h3 className="text-sm font-semibold text-text-primary">Architecture & Build</h3>
        </div>
        <div className="text-xs text-text-muted space-y-1">
          <p>GrowthMind Engine: v2.0-developer-edition</p>
          <p>Created by Dilip Kumawat</p>
          <p>Stack: Next.js 14 · Framer Motion 11 · TailwindCSS · MongoDB / NextAuth</p>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={fadeUp}>
        <button
          onClick={handleSave}
          className="btn-primary text-xs font-medium px-6 py-3"
        >
          {saved ? (
            <>
              <Check size={14} />
              <span>✓ Preferences Saved</span>
            </>
          ) : (
            <>
              <Save size={14} />
              <span>Save System Changes</span>
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
