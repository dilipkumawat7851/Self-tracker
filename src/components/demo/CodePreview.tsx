"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlayVariants, modalContentVariants } from "@/components/motion/motion-variants";
import { Check, Copy, X, Terminal } from "lucide-react";

interface CodePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
  language?: string;
  mode?: string;
}

export default function CodePreview({
  isOpen,
  onClose,
  title,
  code,
  language = "tsx",
  mode,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Syntax highlighting tokenizer
  const renderHighlightedCode = (rawCode: string) => {
    const lines = rawCode.split("\n");
    return lines.map((line, lineIdx) => {
      return (
        <div key={lineIdx} className="table-row font-mono text-[13px] leading-6">
          <span className="table-cell select-none pr-4 text-right text-text-muted/40 text-xs w-8">
            {lineIdx + 1}
          </span>
          <span className="table-cell whitespace-pre">
            {colorizeLine(line)}
          </span>
        </div>
      );
    });
  };

  // Fast token-level colorizer
  const colorizeLine = (line: string) => {
    // Comments
    if (line.trim().startsWith("//")) {
      return <span className="text-zinc-500 italic">{line}</span>;
    }

    // Split words and punctuation for token styling
    const tokenRegex = /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[^`]*`|\b(?:import|export|from|default|const|let|var|function|return|interface|type|async|await|false|true|null|undefined)\b|\b(?:useMotionValue|useSpring|useAnimation|motion|animate)\b|<[A-Za-z0-9_.]+|[{}()[\]]|=>|[0-9]+)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }
      const token = match[0];

      if (token.startsWith("//")) {
        parts.push(<span key={match.index} className="text-zinc-500 italic">{token}</span>);
      } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
        parts.push(<span key={match.index} className="text-emerald-400">{token}</span>);
      } else if (
        /^(import|export|from|default|const|let|var|function|return|interface|type|async|await)$/.test(
          token
        )
      ) {
        parts.push(<span key={match.index} className="text-purple-400 font-semibold">{token}</span>);
      } else if (/^(false|true|null|undefined)$/.test(token)) {
        parts.push(<span key={match.index} className="text-amber-400 font-semibold">{token}</span>);
      } else if (/^(useMotionValue|useSpring|useAnimation|motion|animate)$/.test(token)) {
        parts.push(<span key={match.index} className="text-cyan-400">{token}</span>);
      } else if (token.startsWith("<")) {
        parts.push(<span key={match.index} className="text-blue-400">{token}</span>);
      } else if (/^[0-9]+$/.test(token)) {
        parts.push(<span key={match.index} className="text-orange-400">{token}</span>);
      } else {
        parts.push(token);
      }
      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Dialog */}
          <motion.div
            variants={modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="code-modal-title"
            className="relative z-10 w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl overflow-hidden"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#121216]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-1" />
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-brand-400" />
                  <h3 id="code-modal-title" className="text-xs font-mono font-medium text-text-primary">
                    {title}
                  </h3>
                  {mode && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-500/15 text-brand-300 border border-brand-500/25 uppercase">
                      mode: {mode}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-text-muted px-2 py-0.5 rounded bg-white/5 uppercase">
                  {language}
                </span>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-text-primary transition-all active:scale-95"
                  aria-label="Copy code to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-text-secondary" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 text-text-secondary hover:text-text-primary transition-all"
                  aria-label="Close code preview"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="flex-1 overflow-auto p-5 bg-[#0a0a0c] text-zinc-300 font-mono text-[13px] selection:bg-brand-500/30">
              <div className="table w-full">
                {renderHighlightedCode(code)}
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/5 bg-[#0e0e12] text-[11px] font-mono text-text-muted">
              <span>Framer Motion 11.0 · Hardware Accelerated (GPU)</span>
              <span>Press Esc to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
