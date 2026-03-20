import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrowthMind — AI Habit Growth Tracker",
  description:
    "Track your habits, unlock achievements, and supercharge your personal growth with AI-powered coaching and real-time analytics.",
  keywords: ["habit tracker", "AI coaching", "personal growth", "gamification", "productivity"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
