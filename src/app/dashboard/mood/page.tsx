"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smile, 
  Meh, 
  Frown, 
  Laugh, 
  Zap, 
  Heart, 
  Calendar, 
  Plus, 
  TrendingUp, 
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  emoji: string;
  score: number;
  energy: number;
  tags: string[];
  note: string;
}

const moodOptions = [
  { label: "Rad", emoji: "🤩", score: 5, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800" },
  { label: "Good", emoji: "😄", score: 4, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800" },
  { label: "Okay", emoji: "🙂", score: 3, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800" },
  { label: "Meh", emoji: "😐", score: 2, color: "text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800" },
  { label: "Bad", emoji: "😔", score: 1, color: "text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800" },
];

const defaultTags = ["Productive", "Relaxed", "Focused", "Anxious", "Social", "Creative", "Tired", "Excited", "Healthy"];

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<typeof moodOptions[0]>(moodOptions[1]);
  const [energy, setEnergy] = useState(7);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Productive", "Focused"]);
  const [note, setNote] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [history, setHistory] = useState<MoodEntry[]>([
    { id: "1", date: "Today, 4:30 PM", mood: "Good", emoji: "😄", score: 4, energy: 8, tags: ["Productive", "Focused"], note: "Had a great coding session and finished the milestone early!" },
    { id: "2", date: "Yesterday", mood: "Rad", emoji: "🤩", score: 5, energy: 9, tags: ["Excited", "Creative"], note: "Hit personal record in gym and had coffee with friends." },
    { id: "3", date: "Sep 15", mood: "Okay", emoji: "🙂", score: 3, energy: 6, tags: ["Relaxed"], note: "Quiet Sunday catching up on reading and meditation." },
    { id: "4", date: "Sep 14", mood: "Good", emoji: "😄", score: 4, energy: 7, tags: ["Social", "Healthy"], note: "Long evening walk and good sleep." },
  ]);

  // Load from localStorage if available
  useEffect(() => {
    const local = localStorage.getItem("growthmind_mood_logs");
    if (local) {
      try {
        setHistory(JSON.parse(local));
      } catch (e) {
        // use default
      }
    }
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveMood = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: "Just now",
      mood: selectedMood.label,
      emoji: selectedMood.emoji,
      score: selectedMood.score,
      energy,
      tags: selectedTags,
      note: note.trim() || "Felt " + selectedMood.label.toLowerCase() + " and productive.",
    };

    const updated = [newEntry, ...history];
    setHistory(updated);
    try {
      localStorage.setItem("growthmind_mood_logs", JSON.stringify(updated));
    } catch (e) {}

    setNote("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <Smile className="text-[#F59E0B]" size={28} />
            Mood Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your emotional rhythms, energy, and mental wellness daily.
          </p>
        </div>

        {/* Quick stat badge */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#1E293B] px-4 py-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-[#F59E0B]">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Weekly Average</span>
            <p className="text-sm font-bold text-slate-800 dark:text-white">4.2 / 5 (Good)</p>
          </div>
        </div>
      </div>

      {/* ── Main Interactive Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Check-in Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">How are you feeling right now?</h3>
            <p className="text-xs text-slate-400 mb-6">Select the mood and tags that describe your headspace.</p>

            <form onSubmit={handleSaveMood} className="space-y-6">
              
              {/* Mood Selectors */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {moodOptions.map((opt) => {
                  const isSelected = selectedMood.label === opt.label;
                  return (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => setSelectedMood(opt)}
                      className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-2xl border transition-all ${
                        isSelected 
                          ? `${opt.color} ring-2 ring-[#6366F1] shadow-md scale-105 font-bold`
                          : "border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1.5">{opt.emoji}</span>
                      <span className="text-[11px] sm:text-xs font-semibold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Energy Level Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Zap size={14} className="text-amber-500" /> Energy Level
                  </span>
                  <span className="text-[#6366F1] font-bold">{energy} / 10</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={energy}
                  onChange={(e) => setEnergy(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Drained</span>
                  <span>Balanced</span>
                  <span>Supercharged</span>
                </div>
              </div>

              {/* Emotional Tags */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  What contributed to this mood?
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {defaultTags.map((tag) => {
                    const isTagged = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          isTagged
                            ? "bg-[#6366F1] text-white border-[#6366F1] shadow-xs"
                            : "bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Quick Reflection (Optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's on your mind? What made today feel this way?"
                  className="w-full p-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 outline-none focus:border-[#6366F1] text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                />
              </div>

              {/* Save Button */}
              <div className="flex items-center justify-between pt-2">
                {savedSuccess ? (
                  <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5">
                    <CheckCircle2 size={16} /> Mood logged successfully!
                  </span>
                ) : <div />}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/25 active:scale-95 flex items-center gap-2"
                >
                  <Heart size={14} fill="currentColor" />
                  Save Check-In
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Side: Mood Insights & Recent History (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mood Pulse Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white shadow-md shadow-indigo-500/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-100">Emotional Balance</span>
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold">7-Day Streak</span>
            </div>
            <h4 className="text-2xl font-bold mb-1">Feeling Steady & Strong</h4>
            <p className="text-xs text-indigo-100/90 leading-relaxed">
              Your overall mood has risen 14% this week. Coding milestones and physical exercise appear strongly correlated with your peak energy days!
            </p>
          </div>

          {/* Recent Mood Logs */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Recent Check-Ins</h3>
              <Clock size={16} className="text-slate-400" />
            </div>

            <div className="space-y-3.5">
              {history.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 dark:text-white">{item.mood}</span>
                        <span className="text-[10px] text-slate-400 block">{item.date}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-500">
                      ⚡ {item.energy}/10 Energy
                    </span>
                  </div>

                  {item.note && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic mb-2 line-clamp-2">
                      "{item.note}"
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
