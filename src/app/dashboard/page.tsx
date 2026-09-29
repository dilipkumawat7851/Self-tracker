"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Flag, 
  Smile, 
  CheckSquare, 
  Plus, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  BookOpen, 
  BarChart2, 
  ChevronDown,
  Quote,
  Check,
  Clock
} from "lucide-react";
import Link from "next/link";
import AlarmWidget from "@/components/dashboard/AlarmWidget";

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Dilip";

  // Task list with interactive state
  const [tasks, setTasks] = useState([
    { id: 1, text: "Study DSA", time: "10:00 AM", done: true },
    { id: 2, text: "Go to gym", time: "5:00 PM", done: true },
    { id: 3, text: "Read a book", time: "-", done: false },
    { id: 4, text: "Complete project work", time: "-", done: false },
    { id: 5, text: "Plan tomorrow", time: "-", done: false },
  ]);

  const [newTaskText, setNewTaskText] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAlarmSection, setShowAlarmSection] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: newTaskText.trim(), time: "Now", done: false }]);
    setNewTaskText("");
    setShowAddTask(false);
  };

  // 3-Series Weekly Progress Data matching the mockup
  const weeklyData = [
    { day: "Mon", habits: 42, goals: 25, tasks: 32 },
    { day: "Tue", habits: 40, goals: 18, tasks: 52 },
    { day: "Wed", habits: 72, goals: 30, tasks: 58 },
    { day: "Thu", habits: 60, goals: 72, tasks: 92 },
    { day: "Fri", habits: 82, goals: 50, tasks: 72 },
    { day: "Sat", habits: 42, goals: 26, tasks: 60 },
    { day: "Sun", habits: 72, goals: 52, tasks: 55 },
  ];

  return (
    <div className="max-w-[1300px] mx-auto space-y-6 pb-12">
      
      {/* ── 1. Contained Hero Banner (Hawa Mahal) ── */}
      <div className="relative rounded-3xl overflow-hidden shadow-md min-h-[220px] md:min-h-[240px] flex flex-col justify-between p-6 md:p-8 text-white group">
        {/* Background Hawa Mahal Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700
                     /* Day Mode */
                     brightness-[0.88] saturate-[1.1]
                     /* Night/Dark Mode - Black & White / High contrast */
                     dark:grayscale dark:contrast-[1.2] dark:brightness-[0.65]"
          style={{ backgroundImage: 'url("/hawa-mahal.jpg")' }}
        />
        
        {/* Gradient overlays for crystal clear text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hero Top Bar */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
          {/* Date Badge */}
          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-xl text-xs text-white/90 shadow-sm">
            <Calendar size={14} className="text-white/80" />
            <div>
              <span className="font-semibold">Tue, 17 Sep 2026</span>
              <span className="text-white/60 mx-1.5">•</span>
              <span className="text-white/80">Have a productive day!</span>
            </div>
          </div>

          {/* Frosted Quote Box */}
          <div className="hidden sm:block bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-2xl text-xs text-white shadow-md max-w-xs">
            <p className="font-medium italic">"Consistency creates change."</p>
            <p className="text-white/70 text-[11px] text-right mt-0.5">— Keep going</p>
          </div>
        </div>

        {/* Hero Bottom Greeting */}
        <div className="relative z-10 pt-6">
          <p className="text-sm md:text-base font-normal text-white/90 tracking-wide">
            Good morning,
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mt-0.5 flex items-center gap-2">
            {userName}! <span className="animate-bounce inline-block origin-bottom">👋</span>
          </h1>
          <p className="text-xs md:text-sm text-white/80 mt-1 font-medium">
            A better you, every day.
          </p>
        </div>
      </div>

      {/* ── 2. Metric Cards (4 Cards) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        {/* Habits Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#10B981] flex items-center justify-center">
                <CheckCircle2 size={18} />
              </div>
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">Habits</span>
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              <TrendingUp size={12} /> 20%
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">3/5</p>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">done today</p>
        </div>

        {/* Goals Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/60 text-[#EF4444] flex items-center justify-center">
                <Flag size={18} />
              </div>
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">Goals</span>
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              <TrendingUp size={12} /> 12%
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">2/4</p>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">in progress</p>
        </div>

        {/* Mood Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-[#F59E0B] flex items-center justify-center">
              <Smile size={18} />
            </div>
            <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">Mood</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Good</p>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">Keep it up!</p>
        </div>

        {/* Tasks Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6366F1] flex items-center justify-center">
                <CheckSquare size={18} />
              </div>
              <span className="text-[13px] font-semibold text-slate-600 dark:text-slate-300">Tasks</span>
            </div>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded-md">
              <TrendingDown size={12} /> 10%
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">5</p>
          <p className="text-xs text-slate-400 dark:text-slate-400 mt-1">tasks left</p>
        </div>

      </div>

      {/* ── 3. Main Section: Weekly Progress (Left) & Today's Tasks (Right) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 cols): Weekly Progress & Quick Actions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Weekly Progress Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Weekly Progress</h3>
              
              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6366F1]" />
                  <span>Habits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
                  <span>Goals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span>Tasks</span>
                </div>
              </div>
            </div>

            {/* Bar Chart Area */}
            <div className="relative h-64 pt-4 flex">
              {/* Y-Axis scale */}
              <div className="flex flex-col justify-between text-[11px] text-slate-400 dark:text-slate-500 pr-3 pb-8 text-right select-none">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Grid Lines + Bars Container */}
              <div className="flex-1 relative flex flex-col justify-between">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pb-8 pointer-events-none">
                  <div className="border-b border-dashed border-slate-100 dark:border-slate-800 w-full" />
                  <div className="border-b border-dashed border-slate-100 dark:border-slate-800 w-full" />
                  <div className="border-b border-dashed border-slate-100 dark:border-slate-800 w-full" />
                  <div className="border-b border-dashed border-slate-100 dark:border-slate-800 w-full" />
                  <div className="border-b border-slate-200 dark:border-slate-700 w-full" />
                </div>

                {/* Bars Row */}
                <div className="flex-1 flex items-end justify-between px-2 sm:px-4 z-10 pb-8">
                  {weeklyData.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="flex items-end gap-1 sm:gap-1.5 h-44">
                        {/* Habits Bar */}
                        <motion.div 
                          className="w-2 sm:w-3 bg-[#6366F1] rounded-t-md hover:opacity-90 transition-opacity"
                          initial={{ height: 0 }}
                          animate={{ height: `${item.habits}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05 }}
                          title={`Habits: ${item.habits}%`}
                        />
                        {/* Goals Bar */}
                        <motion.div 
                          className="w-2 sm:w-3 bg-[#A855F7] rounded-t-md hover:opacity-90 transition-opacity"
                          initial={{ height: 0 }}
                          animate={{ height: `${item.goals}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05 + 0.1 }}
                          title={`Goals: ${item.goals}%`}
                        />
                        {/* Tasks Bar */}
                        <motion.div 
                          className="w-2 sm:w-3 bg-[#10B981] rounded-t-md hover:opacity-90 transition-opacity"
                          initial={{ height: 0 }}
                          animate={{ height: `${item.tasks}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05 + 0.2 }}
                          title={`Tasks: ${item.tasks}%`}
                        />
                      </div>
                      {/* Day Label */}
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Add Habit */}
              <Link
                href="/dashboard/habits"
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/70 hover:bg-emerald-100/80 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/50 text-[#10B981] transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-emerald-900/60 flex items-center justify-center shadow-xs">
                  <Plus size={16} className="text-[#10B981] group-hover:rotate-90 transition-transform duration-200" />
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Add Habit</span>
              </Link>

              {/* Add Goal */}
              <Link
                href="/dashboard/goals"
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-purple-200 dark:border-purple-800/50 bg-purple-50/70 hover:bg-purple-100/80 dark:bg-purple-950/30 dark:hover:bg-purple-950/50 text-[#A855F7] transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-purple-900/60 flex items-center justify-center shadow-xs">
                  <Plus size={16} className="text-[#A855F7] group-hover:rotate-90 transition-transform duration-200" />
                </div>
                <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">Add Goal</span>
              </Link>

              {/* Write Journal */}
              <Link
                href="/dashboard/journal"
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-amber-200 dark:border-amber-800/50 bg-amber-50/70 hover:bg-amber-100/80 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-[#F59E0B] transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-amber-900/60 flex items-center justify-center shadow-xs">
                  <BookOpen size={16} className="text-[#F59E0B]" />
                </div>
                <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Write Journal</span>
              </Link>

              {/* View Analytics */}
              <Link
                href="/dashboard/analytics"
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-blue-200 dark:border-blue-800/50 bg-blue-50/70 hover:bg-blue-100/80 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 text-[#6366F1] transition-all group active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-white dark:bg-blue-900/60 flex items-center justify-center shadow-xs">
                  <BarChart2 size={16} className="text-[#6366F1]" />
                </div>
                <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">View Analytics</span>
              </Link>

            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Today's Tasks & Motivation / Streak */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Today's Tasks Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Today&apos;s Tasks</h3>
              <button 
                onClick={() => setShowAddTask(!showAddTask)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-semibold transition-colors shadow-sm shadow-indigo-500/20 active:scale-95"
              >
                <Plus size={14} /> Add Task
              </button>
            </div>

            {/* Quick Add Form */}
            {showAddTask && (
              <form onSubmit={addTask} className="mb-4 flex gap-2">
                <input 
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="Enter task name..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#6366F1]"
                  autoFocus
                />
                <button type="submit" className="px-3 py-2 bg-[#10B981] text-white text-xs font-semibold rounded-xl">
                  Add
                </button>
              </form>
            )}

            {/* Task Items */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        task.done 
                          ? "bg-[#6366F1] border-[#6366F1] text-white" 
                          : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 group-hover:border-[#6366F1]"
                      }`}
                    >
                      {task.done && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className={`text-[13px] font-medium transition-all ${
                      task.done 
                        ? "text-slate-400 dark:text-slate-500 line-through" 
                        : "text-slate-700 dark:text-slate-200"
                    }`}>
                      {task.text}
                    </span>
                  </div>

                  <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {task.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Motivation & Streak Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Motivation Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-[#1E293B] dark:to-[#0F172A] border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Motivation</span>
              </div>
              <div className="my-auto flex items-start gap-2.5">
                <Quote size={20} className="text-[#6366F1] flex-shrink-0 mt-0.5" />
                <p className="text-[13px] font-medium text-slate-700 dark:text-slate-200 italic leading-snug">
                  "Small steps every day lead to big results."
                </p>
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                GrowthMind Daily
              </div>
            </div>

            {/* Streak Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-[140px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Streak</span>
                <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400 cursor-pointer hover:text-slate-600">
                  <span>This Month</span>
                  <ChevronDown size={12} />
                </div>
              </div>

              <div className="flex items-center gap-3 my-auto">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 flex items-center justify-center text-orange-500">
                  <Flame size={22} className="fill-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 dark:text-white leading-tight">12</p>
                  <p className="text-[11px] text-slate-400">days in a row</p>
                </div>
              </div>

              {/* Sparkline trend preview */}
              <div className="h-8 w-full mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 25" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="streakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0 20 Q 20 18, 35 15 T 70 8 T 100 2 L 100 25 L 0 25 Z" 
                    fill="url(#streakGrad)" 
                  />
                  <path 
                    d="M0 20 Q 20 18, 35 15 T 70 8 T 100 2" 
                    fill="none" 
                    stroke="#6366F1" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── 4. Alarm & Clock Feature Toggle & Section ── */}
      <div className="pt-2">
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-[#6366F1] flex items-center justify-center">
              <Clock size={18} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-slate-800 dark:text-white">Smart Alarm & Live Clock</h4>
              <p className="text-xs text-slate-400">Set daily waking alarms and track real-time productivity cycles</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAlarmSection(!showAlarmSection)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <span>{showAlarmSection ? "Hide Clock" : "View Clock & Alarm"}</span>
            <ChevronDown size={14} className={`transform transition-transform ${showAlarmSection ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showAlarmSection && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <AlarmWidget />
          </motion.div>
        )}
      </div>

    </div>
  );
}
