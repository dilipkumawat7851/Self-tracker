"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, FormEvent } from "react";
import { Bot, Send, Sparkles, Terminal } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Analyze my streaks",
  "Give me motivation",
  "Suggest a new habit",
  "How to improve?",
];

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "GrowthMind AI Coach initialized. 👋 I am here to analyze your consistency vectors, identify friction points, and engineer a high-performance routine. What protocol shall we evaluate today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Coach request failed");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      if (reader) {
        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + chunk }
                  : m
              )
            );
          }
        }
      }
    } catch (error) {
      console.error("Coach error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content:
            "Connection interrupted. Please verify your network or API status and retry! 🔄",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-125px)] pb-4">
      {/* Terminal Header */}
      <div className="dev-card p-4 flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/15 border border-brand-200 dark:border-brand-500/30 flex items-center justify-center text-brand-500">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold font-display text-text-primary">
                AI Coach Terminal
              </h1>
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25">
                ACTIVE STREAM
              </span>
            </div>
            <p className="text-[11px] text-text-muted">
              MODEL: LLM · STREAMING INTERFACE · HABIT INTELLIGENCE
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
          <Terminal size={14} />
          <span>PORT: 3000</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3.5 pr-2 select-text"
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line border ${
                msg.role === "user"
                  ? "bg-brand-50 dark:bg-brand-500/20 border-brand-200 dark:border-brand-500/35 text-text-primary rounded-tr-sm"
                  : "bg-surface border-border text-text-primary rounded-tl-sm shadow-card"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="dev-card px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-2 mt-3 mb-2.5">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            disabled={isLoading}
            className="text-xs font-medium px-3 py-1 rounded-full border border-border bg-surface hover:bg-surface-hover hover:border-brand-300 dark:hover:border-brand-500/30 text-text-secondary hover:text-text-primary transition-all disabled:opacity-40"
          >
            + {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="flex gap-2.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask coach for habit strategies, streak diagnostics, or routine upgrades..."
          className="input-field flex-1 font-sans text-xs sm:text-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="btn-primary px-5 text-xs font-medium"
        >
          <Send size={14} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
