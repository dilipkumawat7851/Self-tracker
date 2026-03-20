"use client";

import { motion } from "framer-motion";
import type { AIInsight } from "@/lib/types";

interface AIInsightPanelProps {
  insights: AIInsight[];
}

const typeConfig = {
  analysis: { icon: "📊", border: "border-brand-500/20", bg: "bg-brand-500/5" },
  tip: { icon: "💡", border: "border-cyan-500/20", bg: "bg-cyan-500/5" },
  motivation: { icon: "🔥", border: "border-accent-500/20", bg: "bg-accent-500/5" },
  warning: { icon: "⚠️", border: "border-amber-500/20", bg: "bg-amber-500/5" },
};

export default function AIInsightPanel({ insights }: AIInsightPanelProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <h3 className="section-title">AI Insights</h3>
        </div>
        <span className="badge-brand">Smart</span>
      </div>

      <div className="space-y-3">
        {insights.map((insight, i) => {
          const config = typeConfig[insight.type];
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className={`p-4 rounded-xl border ${config.border} ${config.bg}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{config.icon}</span>
                <p className="text-sm text-surface-200/70 leading-relaxed">{insight.content}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
