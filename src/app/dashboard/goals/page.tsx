import HawaMahalHero from "@/components/dashboard/HawaMahalHero";
import AlarmWidget from "@/components/dashboard/AlarmWidget";
import GoogleFitWidget from "@/components/dashboard/GoogleFitWidget";
import { CheckCircle2, Target, TrendingUp, Medal } from "lucide-react";

export default function GoalsPage() {
  const activeGoals = [
    { title: "Run 5K under 25 mins", category: "Fitness", progress: 75, date: "Oct 15" },
    { title: "Read 12 Books", category: "Learning", progress: 40, date: "Dec 31" },
    { title: "Meditate 30 Days Streak", category: "Mindfulness", progress: 90, date: "Sep 30" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 text-text-primary">
      
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold">Goals & Ambitions</h1>
          <p className="text-[13px] text-text-muted mt-1">
            Build your life with beautiful vision, step by step.
          </p>
        </div>
      </div>

      {/* ── Hawa Mahal Hero (Day/Night Theme aware) ── */}
      <HawaMahalHero />

      {/* ── Secondary Grid (Widgets) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AlarmWidget />
        <GoogleFitWidget />
      </div>

      {/* ── Active Goals List ── */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-text-primary">Active Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeGoals.map((goal, idx) => (
            <div key={idx} className="p-5 rounded-[16px] bg-surface/60 backdrop-blur-xl border border-border/50 shadow-sm flex flex-col justify-between group hover:border-brand-500/50 hover:bg-surface/80 transition-colors cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${
                  goal.category === 'Fitness' ? 'bg-orange-500/10 text-orange-500' :
                  goal.category === 'Learning' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-purple-500/10 text-purple-500'
                }`}>
                  {goal.category === 'Fitness' ? <Target size={18} /> : 
                   goal.category === 'Learning' ? <TrendingUp size={18} /> : 
                   <Medal size={18} />}
                </div>
                <span className="text-xs text-text-muted font-medium bg-surface-elevated px-2 py-1 rounded-md">
                  Target: {goal.date}
                </span>
              </div>
              
              <div>
                <h4 className="font-semibold text-[15px] mb-1">{goal.title}</h4>
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span>Progress</span>
                  <span className="font-medium text-text-primary">{goal.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-active rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full" 
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
