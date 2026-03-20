"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Hey Dilip! 👋 I'm your AI habit coach. I've been analyzing your habit data. Your meditation streak is impressive at 12 days! I noticed your workout completion dips on weekends — would you like some strategies to stay consistent?",
    timestamp: new Date(Date.now() - 60000),
  },
];

const quickPrompts = [
  "Analyze my streaks",
  "Give me motivation",
  "Suggest a new habit",
  "How to improve?",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses: Record<string, string> = {
    "analyze my streaks":
      "📊 **Streak Analysis:**\n\n🧘 Meditation: 12 days (trending ↑)\n📚 Reading: 8 days (steady)\n💪 Workout: 5 days (needs attention on weekends)\n✍️ Journal: 20 days — your longest! 🌟\n💧 Water: 15 days (great consistency)\n\nYour journal habit is your strongest — consider anchoring weaker habits to it. Try journaling right after your workout to create a chain.",
    "give me motivation":
      "🔥 **You're doing amazing, Dilip!**\n\nYou've completed over 1,450 XP worth of habits. That's not luck — that's discipline. Remember:\n\n> \"We are what we repeatedly do. Excellence, then, is not an act, but a habit.\" — Aristotle\n\nYou're only 4 days away from the 'Consistency King' achievement. Don't break the chain! 💪",
    "suggest a new habit":
      "Based on your current habits, here are 3 suggestions:\n\n1. 🌅 **Wake up at 6 AM** — Complements your meditation\n2. 🥗 **Healthy meal prep** — Pairs well with your hydration habit\n3. 📝 **Review goals weekly** — Reflect on your progress every Sunday\n\nWant me to help you set one up?",
    "how to improve?":
      "Here's a personalized improvement plan:\n\n1. **Chain habits together** — Do meditation → journaling → reading as a morning block\n2. **Set weekend minimums** — Reduce workout target to 20 min on weekends\n3. **Use the 2-minute rule** — Start with just 2 minutes when you feel resistance\n4. **Track your energy** — Note when you feel most productive and schedule hard habits there\n\nYour consistency is already top-tier. These small tweaks can push you to the next level! 🚀",
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const key = msg.toLowerCase();
      const response =
        aiResponses[key] ||
        `Great question! Based on your habit data, I can see you're making solid progress. Here are some thoughts:\n\n✅ Your strongest area is consistency in journaling and water intake\n📈 There's room for growth in your workout and DSA practice\n💡 Try habit stacking: attach a new behavior to an existing one\n\nWould you like me to create a specific plan for "${msg}"?`;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-130px)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <h1 className="text-xl font-bold font-display">AI Coach</h1>
          <p className="text-xs text-surface-200/40">Powered by AI · Personalized insights</p>
        </div>
        <span className="ml-auto badge-accent text-xs">Online</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-brand-600/30 border border-brand-500/20 rounded-tr-sm"
                  : "glass-card rounded-tl-sm"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="glass-card px-5 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mt-4 mb-3">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="text-xs px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-surface-200/60 hover:bg-white/[0.06] hover:text-white transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask your AI coach anything..."
          className="input-field flex-1"
        />
        <button onClick={() => handleSend()} className="btn-primary px-5">
          Send
        </button>
      </div>
    </div>
  );
}
