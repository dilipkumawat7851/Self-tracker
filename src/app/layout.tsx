import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
