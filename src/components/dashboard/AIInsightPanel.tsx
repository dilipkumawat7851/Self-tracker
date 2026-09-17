"use client";

import { motion } from "framer-motion";
import type { AIInsight } from "@/lib/types";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface AIInsightPanelProps {
  insights: AIInsight[];
}

const typeConfig = {
  analysis: { icon: "📊", border: "border-brand-200/60 dark:border-brand-500/20", bg: "bg-brand-50 dark:bg-brand-500/5", tag: "ANALYSIS", color: "text-brand-600 dark:text-brand-300" },
  tip: { icon: "💡", border: "border-cyan-200/60 dark:border-cyan-500/20", bg: "bg-cyan-50 dark:bg-cyan-500/5", tag: "OPTIMIZATION", color: "text-cyan-600 dark:text-cyan-300" },
  motivation: { icon: "🔥", border: "border-emerald-200/60 dark:border-accent-500/20", bg: "bg-emerald-50 dark:bg-accent-500/5", tag: "MOMENTUM", color: "text-emerald-600 dark:text-accent-300" },
  warning: { icon: "⚠️", border: "border-amber-200/60 dark:border-amber-500/20", bg: "bg-amber-50 dark:bg-amber-500/5", tag: "FRICTION", color: "text-amber-600 dark:text-amber-300" },
};

export default function AIInsightPanel({ insights }: AIInsightPanelProps) {
  return (
    <div className="dev-card p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-brand-500" />
            <h3 className="section-title text-sm">AI Insights Engine</h3>
          </div>
          <span className="badge-brand text-[10px]">SMART MODEL</span>
        </div>

        <div className="space-y-3">
          {insights.map((insight, i) => {
            const config = typeConfig[insight.type] || typeConfig.tip;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className={`p-3.5 rounded-xl border ${config.border} ${config.bg} transition-colors hover:border-border-hover`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-semibold ${config.color} uppercase`}>
                    {config.tag}
                  </span>
                  <span className="text-xs">{config.icon}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {insight.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <Link
          href="/dashboard/coach"
          className="flex items-center justify-between text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200 transition-colors group"
        >
          <span>Open AI Coach Terminal</span>
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
