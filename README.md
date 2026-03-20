# 🌱 GrowthMind — AI Habit Growth Tracker

A premium **Next.js 14** SaaS web application for tracking habits and personal growth, powered by AI coaching, gamification, and beautiful analytics.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?style=flat-square)

---

## ✨ Features

- 📊 **Smart Dashboard** — Daily progress, streak tracking, AI insights, and weekly charts
- 🤖 **AI Coach** — Personalized habit coaching with smart suggestions and analysis
- 🏆 **Gamification** — XP system, levels, achievement badges, and streak rewards
- 📈 **Analytics** — GitHub-style heatmap, trend charts, and per-habit breakdown
- 🎯 **Habit CRUD** — Create, edit, delete habits with custom icons and colors
- 🌙 **Premium Dark UI** — Glassmorphism design with ambient glow effects
- ⚡ **Animations** — Framer Motion powered micro-interactions throughout

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/dilipkumawat7851/Self-tracker.git
cd Self-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Landing page
│   ├── login/                  # Auth pages
│   └── dashboard/
│       ├── page.tsx            # Main dashboard
│       ├── habits/             # Habit management (CRUD)
│       ├── analytics/          # Charts & heatmap
│       ├── coach/              # AI Coach chat
│       ├── achievements/       # Badge system
│       └── settings/           # Profile & preferences
├── components/
│   ├── layout/                 # Sidebar, Navbar
│   ├── habits/                 # HabitCard
│   ├── ui/                     # ProgressRing
│   ├── analytics/              # WeeklyChart, HabitHeatmap
│   └── dashboard/              # AIInsightPanel
└── lib/
    ├── types.ts                # TypeScript interfaces
    ├── utils.ts                # Utility functions
    └── mock-data.ts            # Demo data
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **TailwindCSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Data visualization |
| **Lucide React** | Icon system |

## 🎨 Design System

- **Colors**: Purple (#8b5cf6) + Cyan (#06b6d4) brand gradient
- **Theme**: Dark glassmorphism with backdrop blur
- **Fonts**: Inter (body) + Outfit (display)
- **Animations**: Float, shimmer, glow-pulse, streak-fire, slide-up

## 📄 License

MIT

---

Built with 💜 by **Dilip Kumawat**
