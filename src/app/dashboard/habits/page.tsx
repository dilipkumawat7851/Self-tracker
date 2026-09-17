"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import HabitCard from "@/components/habits/HabitCard";
import { mockHabits } from "@/lib/mock-data";
import { Plus, X, Trash2, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp } from "@/components/motion/motion-variants";

export default function HabitsPage() {
  const [habits, setHabits] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newIcon, setNewIcon] = useState("🎯");
  const [newColor, setNewColor] = useState("#4F6AF6");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/habits")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHabits(data);
        } else {
          setHabits(mockHabits);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setHabits(mockHabits);
        setLoading(false);
      });
  }, []);

  const handleComplete = async (id: string) => {
    try {
      const res = await fetch(`/api/habits/${id}/complete`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setHabits((prev) =>
          prev.map((h) =>
            h.id === id ? { ...h, completedToday: data.completedToday, streak: data.streak } : h
          )
        );
        if (data.completedToday) {
          confetti({
            particleCount: 90,
            spread: 60,
            origin: { y: 0.65 },
            colors: ["#4F6AF6", "#10b981", "#06b6d4"],
          });
        }
      } else {
        setHabits((prev) =>
          prev.map((h) => {
            if (h.id === id) {
              const nextVal = !h.completedToday;
              if (nextVal) {
                confetti({
                  particleCount: 90,
                  spread: 60,
                  origin: { y: 0.65 },
                  colors: ["#4F6AF6", "#10b981", "#06b6d4"],
                });
              }
              return {
                ...h,
                completedToday: nextVal,
                streak: nextVal ? h.streak + 1 : Math.max(0, h.streak - 1),
              };
            }
            return h;
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      const res = await fetch("/api/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          description: newDesc,
          icon: newIcon,
          color: newColor,
          frequency: "daily",
          targetDays: 7,
        }),
      });
      if (res.ok) {
        const newHabit = await res.json();
        setHabits((prev) => [newHabit, ...prev]);
      } else {
        const localNew = {
          id: Date.now().toString(),
          name: newName,
          description: newDesc || "Custom habit protocol",
          icon: newIcon,
          color: newColor,
          frequency: "daily",
          targetDays: 7,
          streak: 0,
          longestStreak: 0,
          completedToday: false,
          isActive: true,
          createdAt: new Date(),
        };
        setHabits((prev) => [localNew, ...prev]);
      }
      setNewName("");
      setNewDesc("");
      setNewIcon("🎯");
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/habits/${id}`, { method: "DELETE" });
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (err) {
      console.error(err);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    }
  };

  const icons = ["🎯", "💪", "📚", "🧘", "💻", "✍️", "💧", "🏃", "🎨", "🎵", "🌱", "🧠"];
  const colors = ["#4F6AF6", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#3b82f6", "#ef4444", "#14b8a6"];

  const completedCount = habits.filter((h) => h.completedToday).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* ── Top Header ── */}
      <div className="dev-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-display text-text-primary">
            Habit Protocols
          </h1>
          <p className="text-xs font-medium text-text-muted mt-1">
            {habits.length} ACTIVE PROTOCOLS · {completedCount} EXECUTED TODAY ({habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0}%)
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-xs font-medium px-4 py-2.5 self-start sm:self-auto"
        >
          {showForm ? (
            <>
              <X size={14} />
              <span>Cancel Protocol</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span>+ Create Protocol</span>
            </>
          )}
        </button>
      </div>

      {/* ── Create Form Modal / Drawer ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="dev-card p-6 space-y-5 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-brand-500" />
              <h3 className="text-sm font-semibold text-text-primary">Define New Habit Protocol</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-text-muted mb-1.5 block uppercase">
                  Protocol Name
                </label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Deep Work Session"
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-text-muted mb-1.5 block uppercase">
                  Description / Intended Metric
                </label>
                <input
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="e.g. 45 mins uninterrupted focus"
                  className="input-field"
                />
              </div>
            </div>

            {/* Icon Picker */}
            <div>
              <label className="text-[11px] font-medium text-text-muted mb-2 block uppercase">
                Emoji Identifier
              </label>
              <div className="flex flex-wrap gap-2">
                {icons.map((ic) => (
                  <button
                    key={ic}
                    type="button"
                    onClick={() => setNewIcon(ic)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all ${
                      newIcon === ic
                        ? "bg-brand-50 dark:bg-brand-500/25 border border-brand-300 dark:border-brand-500/50 scale-110 shadow-glow"
                        : "bg-surface border border-border hover:border-border-hover"
                    }`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Accent Picker */}
            <div>
              <label className="text-[11px] font-medium text-text-muted mb-2 block uppercase">
                Accent Token
              </label>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setNewColor(c)}
                    className={`w-7 h-7 rounded-full transition-all ${
                      newColor === c ? "ring-2 ring-brand-500 ring-offset-2 ring-offset-surface scale-110" : ""
                    }`}
                    style={{ backgroundColor: c }}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button onClick={handleCreate} className="btn-accent text-xs font-medium px-5 py-2.5">
                ✨ Save & Activate Protocol
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Habits Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <div key={habit.id} className="relative group">
            <HabitCard habit={habit} onComplete={handleComplete} />
            <button
              onClick={() => handleDelete(habit.id)}
              className="absolute top-3.5 right-14 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/25 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-300 transition-all text-xs"
              title="Delete protocol"
              aria-label="Delete habit"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
