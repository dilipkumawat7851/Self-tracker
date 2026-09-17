"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Calendar, 
  Tag, 
  Filter,
  AlertCircle,
  TrendingUp
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  time: string;
  category: "Study" | "Work" | "Health" | "Personal";
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

const defaultTasks: Task[] = [
  { id: "1", title: "Study DSA (Binary Trees & Graphs)", time: "10:00 AM", category: "Study", priority: "High", completed: true },
  { id: "2", title: "Go to gym & 5K run", time: "5:00 PM", category: "Health", priority: "High", completed: true },
  { id: "3", title: "Read 20 pages of atomic habits", time: "8:00 PM", category: "Personal", priority: "Medium", completed: false },
  { id: "4", title: "Complete project work and deploy API", time: "3:00 PM", category: "Work", priority: "High", completed: false },
  { id: "5", title: "Plan schedule for tomorrow", time: "9:30 PM", category: "Personal", priority: "Low", completed: false },
  { id: "6", title: "Review MongoDB indexes and cache", time: "11:30 AM", category: "Study", priority: "Medium", completed: false },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed" | "High Priority">("All");
  
  // New task form state
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<Task["category"]>("Study");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("growthmind_tasks_list");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    try {
      localStorage.setItem("growthmind_tasks_list", JSON.stringify(newTasks));
    } catch (e) {}
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const deleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = tasks.filter(t => t.id !== id);
    saveTasks(updated);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      time: time.trim() || "Anytime",
      category,
      priority,
      completed: false,
    };

    saveTasks([newTask, ...tasks]);
    setTitle("");
    setTime("");
    setIsAdding(false);
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "Pending") return !t.completed;
    if (filter === "Completed") return t.completed;
    if (filter === "High Priority") return t.priority === "High";
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2.5">
            <CheckSquare className="text-[#6366F1]" size={28} />
            Task Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize daily protocols, priorities, and conquer your goals.
          </p>
        </div>

        {/* Add Task Trigger */}
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-5 py-2.5 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold rounded-2xl shadow-md shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          {isAdding ? "Cancel" : "Add New Task"}
        </button>
      </div>

      {/* ── Stats Summary Bar ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-400">Total Tasks</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-0.5">{tasks.length}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-500">Completed</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-0.5">{completedCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-500">Pending</span>
          <p className="text-2xl font-bold text-slate-800 dark:text-white mt-0.5">{tasks.length - completedCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-400">
            <span>Completion Rate</span>
            <span className="text-[#6366F1] font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-[#6366F1] rounded-full transition-all duration-500" 
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Quick Add Form (Collapsible) ── */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Create a New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Task Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Review system design architecture"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#6366F1]"
                    required
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Due Time</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g., 2:30 PM or Today"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#6366F1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Task["category"])}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#6366F1] cursor-pointer text-slate-700 dark:text-slate-200"
                  >
                    <option value="Study">Study</option>
                    <option value="Work">Work</option>
                    <option value="Health">Health</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Task["priority"])}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-[#6366F1] cursor-pointer text-slate-700 dark:text-slate-200"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6366F1] text-white text-xs font-bold rounded-xl hover:bg-[#4F46E5] shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Filters Bar ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(["All", "Pending", "Completed", "High Priority"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === tab
                ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                : "bg-white dark:bg-[#1E293B] text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Task Items List ── */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200/80 dark:border-slate-800">
            <CheckSquare size={36} className="mx-auto text-slate-300 dark:text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No tasks in this view</p>
            <p className="text-xs text-slate-400 mt-0.5">Click "+ Add New Task" to create one.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-4 rounded-2xl bg-white dark:bg-[#1E293B] border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                task.completed
                  ? "border-slate-200/60 dark:border-slate-800/60 opacity-65"
                  : "border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-[#6366F1]/50 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                {/* Custom Checkbox */}
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all flex-shrink-0 ${
                    task.completed
                      ? "bg-[#6366F1] border-[#6366F1] text-white"
                      : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 group-hover:border-[#6366F1]"
                  }`}
                >
                  {task.completed && <Check size={14} strokeWidth={3} />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-semibold truncate transition-all ${
                    task.completed 
                      ? "line-through text-slate-400 dark:text-slate-500" 
                      : "text-slate-800 dark:text-slate-100"
                  }`}>
                    {task.title}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {/* Time */}
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {task.time}
                    </span>

                    {/* Category */}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {task.category}
                    </span>

                    {/* Priority */}
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      task.priority === "High" ? "bg-rose-50 text-rose-500 dark:bg-rose-950/40" :
                      task.priority === "Medium" ? "bg-amber-50 text-amber-500 dark:bg-amber-950/40" :
                      "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={(e) => deleteTask(task.id, e)}
                className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
