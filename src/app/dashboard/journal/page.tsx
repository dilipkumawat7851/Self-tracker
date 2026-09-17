"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Calendar, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Quote, 
  Bookmark,
  Clock,
  Heart
} from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: string;
  wordCount: number;
}

const defaultEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Breakthrough in Architecture and System Flow",
    content: "Today was one of those deeply rewarding days where things just click. Solved the dashboard layout challenge, optimized the component rendering, and maintained high performance. Reminds me that steady focus beats sporadic intensity every time.",
    date: "Sep 17, 2026",
    tag: "Productivity",
    wordCount: 42
  },
  {
    id: "2",
    title: "Morning Run & Clarity",
    content: "Took an early 5K run at sunrise. The cool breeze and quiet streets gave me space to detach from digital noise. Practicing mindfulness isn't just about sitting still; it's about being present in what you do.",
    date: "Sep 16, 2026",
    tag: "Mindfulness",
    wordCount: 38
  },
  {
    id: "3",
    title: "Continuous Learning & DSA Journey",
    content: "Wrapped up tree traversal algorithms today. Realized that visualization is the best way to understand recursion. Looking forward to mastering graphs next week.",
    date: "Sep 14, 2026",
    tag: "Learning",
    wordCount: 28
  }
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(defaultEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWriting, setIsWriting] = useState(false);

  // New Entry Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Daily Reflection");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("growthmind_journal_entries");
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem("growthmind_journal_entries", JSON.stringify(newEntries));
    } catch (e) {}
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const words = content.trim().split(/\s+/).length;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: formattedDate,
      tag,
      wordCount: words,
    };

    saveEntries([newEntry, ...entries]);
    setTitle("");
    setContent("");
    setIsWriting(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const deleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = entries.filter(e => e.id !== id);
    saveEntries(updated);
  };

  const filteredEntries = entries.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <BookOpen className="text-[#F59E0B]" size={28} />
            Daily Journal & Reflections
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Capture thoughts, celebrate wins, and track your internal growth.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-2xl shadow-md shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          {isWriting ? "Close Editor" : "New Journal Entry"}
        </button>
      </div>

      {/* ── Top Highlights ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-[#F59E0B]">
            <Bookmark size={20} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Total Entries</span>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{entries.length}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Reflection Streak</span>
            <p className="text-xl font-bold text-slate-800 dark:text-white">5 Days</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-[#6366F1]">
            <Heart size={20} />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold">Gratitude Index</span>
            <p className="text-xl font-bold text-slate-800 dark:text-white">High (100%)</p>
          </div>
        </div>
      </div>

      {/* ── New Entry Editor (Collapsible) ── */}
      <AnimatePresence>
        {isWriting && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-md"
          >
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">Write Today&apos;s Entry</h3>
            <p className="text-xs text-slate-400 mb-5">Pour your thoughts out. No judgments, just honest reflection.</p>

            <form onSubmit={handleSaveEntry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., A lesson in patience and deep work"
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B] text-slate-800 dark:text-slate-100"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Theme Tag</label>
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B] text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <option value="Daily Reflection">Daily Reflection</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Mindfulness">Mindfulness</option>
                    <option value="Learning">Learning</option>
                    <option value="Gratitude">Gratitude</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Your Thoughts</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What went well today? What challenges did you encounter? What did you discover about yourself?"
                  className="w-full p-4 text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#F59E0B] text-slate-800 dark:text-slate-100 placeholder:text-slate-400 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400">
                  {content.trim() ? content.trim().split(/\s+/).length : 0} words
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriting(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold rounded-xl shadow-xs"
                  >
                    Save Entry
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search & Filter ── */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search journal entries..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 outline-none focus:border-[#F59E0B] text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
      </div>

      {/* ── Entries Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredEntries.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800">
            <BookOpen size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No journal entries found</p>
            <p className="text-xs text-slate-400 mt-0.5">Click "New Journal Entry" above to start your first reflection.</p>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/50 text-[#F59E0B]">
                    {entry.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium">{entry.date}</span>
                    <button
                      onClick={(e) => deleteEntry(entry.id, e)}
                      className="p-1 text-slate-300 hover:text-rose-500 rounded-md transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover:text-[#F59E0B] transition-colors">
                  {entry.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                  {entry.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> ~{Math.max(1, Math.ceil(entry.wordCount / 100))} min read
                </span>
                <span>{entry.wordCount} words</span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
