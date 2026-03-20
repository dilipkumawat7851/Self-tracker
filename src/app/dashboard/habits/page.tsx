"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HabitCard from "@/components/habits/HabitCard";
import { mockHabits } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function HabitsPage() {
  const [habits, setHabits] = useState(mockHabits);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("🎯");
  const [newColor, setNewColor] = useState("#8b5cf6");

  const handleComplete = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, completedToday: !h.completedToday, streak: h.completedToday ? h.streak - 1 : h.streak + 1 }
          : h
      )
    );
  };

  const handleCreate = () => {
    if (!newName.trim()) return;
    setHabits((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        userId: "user1",
        name: newName,
        description: newDesc,
        icon: newIcon,
        color: newColor,
        frequency: "daily" as const,
        targetDays: 7,
        streak: 0,
        longestStreak: 0,
        isActive: true,
        completedToday: false,
        createdAt: new Date(),
      },
    ]);
    setNewName("");
    setNewDesc("");
    setNewIcon("🎯");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const icons = ["🎯", "💪", "📚", "🧘", "💻", "✍️", "💧", "🏃", "🎨", "🎵", "🌱", "🧠"];
  const colors = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#ef4444", "#14b8a6"];

  return (
    <div className="max-w-5xl space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display">My Habits</h1>
          <p className="text-sm text-surface-200/50 mt-1">
            {habits.length} habits · {habits.filter((h) => h.completedToday).length} completed today
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm px-5 py-2.5">
          {showForm ? "Cancel" : "+ New Habit"}
        </button>
      </div>

      {/* ── Create Form ── */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card p-6 space-y-5"
        >
          <h3 className="text-lg font-semibold">Create New Habit</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-surface-200/50 mb-1.5 block">
                Habit Name
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Morning Meditation"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-surface-200/50 mb-1.5 block">
                Description
              </label>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="e.g. 15 min mindfulness"
                className="input-field"
              />
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="text-xs font-medium text-surface-200/50 mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {icons.map((ic) => (
                <button
                  key={ic}
                  onClick={() => setNewIcon(ic)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                    newIcon === ic
                      ? "bg-brand-500/20 border border-brand-500/40 scale-110"
                      : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]"
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-xs font-medium text-surface-200/50 mb-2 block">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    newColor === c ? "ring-2 ring-white ring-offset-2 ring-offset-surface-900 scale-110" : ""
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button onClick={handleCreate} className="btn-accent text-sm px-6 py-2.5">
            ✨ Create Habit
          </button>
        </motion.div>
      )}

      {/* ── Habits Grid ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {habits.map((habit) => (
          <div key={habit.id} className="relative group">
            <HabitCard habit={habit} onComplete={handleComplete} />
            <button
              onClick={() => handleDelete(habit.id)}
              className="absolute top-3 right-14 opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xs transition-all hover:bg-red-500/20"
              title="Delete habit"
            >
              ✕
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
