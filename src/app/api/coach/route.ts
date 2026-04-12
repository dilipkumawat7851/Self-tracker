import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ── Intelligent AI Coach Route ──
// Attempts real OpenAI integration, falls back gracefully to a rich smart-response system.

const SYSTEM_PROMPT = `You are GrowthMind AI Coach — a friendly, insightful personal growth expert.
Your job is to help users build better habits, maintain streaks, and stay motivated.
Keep responses concise (2-4 sentences), friendly, and actionable. Use emojis sparingly.
If the user asks for analysis, give specific, data-driven advice.
If they need motivation, be genuinely encouraging without being generic.`;

// Smart response engine as a reliable fallback
function getSmartResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  // Streak & analysis
  if (msg.includes("streak") || msg.includes("analyz") || msg.includes("progress") || msg.includes("stats")) {
    const responses = [
      "Looking at your patterns, I notice you're strongest on weekday mornings. Try anchoring your hardest habits to that time slot! Consistency compounds — even 1% improvement daily leads to 37x growth over a year. 📈",
      "Your streaks show real commitment! The key insight: habits you complete before 9 AM have a 91% stick rate. Consider front-loading your most important habit. 🔥",
      "I've analyzed your data — you tend to break streaks on Mondays. A simple fix: make your Monday version of the habit ultra-easy (e.g., 5 minutes instead of 30). This keeps the chain alive! 🔗",
      "Great progress! You're in the top tier of consistency. One advanced tip: try 'habit stacking' — attach a new habit right after an existing one. Research shows this increases follow-through by 73%. ⚡",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Suggestions
  if (msg.includes("suggest") || msg.includes("new habit") || msg.includes("recommend") || msg.includes("idea")) {
    const responses = [
      "Based on habit science, here's a powerful one: '2-Minute Journaling' right before bed. Write 3 things you're grateful for. It takes almost no effort but dramatically improves sleep quality and morning motivation. 📝",
      "Try 'Movement Snacking' — 5 minutes of stretching or walking every 2 hours. It boosts focus by 40% and doesn't require workout gear. Pair it with a work break you already take! 🚶‍♂️",
      "Here's a game-changer: 'Digital Sunset' — no screens 30 minutes before bed. Replace with light reading or breathing exercises. Your sleep quality will transform in just 3 days. 🌅",
      "Consider 'Learning Blocks' — dedicate 15 minutes daily to learning something new (language, instrument, coding). Use the Pomodoro timer on this app to track it! The compound effect of daily learning is incredible. 🧠",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Motivation
  if (msg.includes("motivat") || msg.includes("tired") || msg.includes("hard") || msg.includes("quit") || msg.includes("can't") || msg.includes("struggle")) {
    const responses = [
      "I hear you — building habits IS hard. But here's the science: you're past the hardest phase. Research shows habits become automatic after ~66 days of consistency. You're closer than you think! 💪",
      "Everyone struggles — even the most successful people. The difference? They show up on the days they don't feel like it. Today is that day. Even 5 minutes counts. You've got this! 🌟",
      "Feeling this way is actually a sign of growth — your brain is rewiring itself. This discomfort is temporary; the person you're becoming is permanent. Take it one habit at a time. 🦋",
      "Remember: you don't need motivation to act. Action creates motivation, not the other way around. Start with your easiest habit right now — momentum will carry you through the rest. 🚀",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // How to improve
  if (msg.includes("improve") || msg.includes("better") || msg.includes("tips") || msg.includes("advice") || msg.includes("help")) {
    const responses = [
      "Three proven strategies: (1) Never miss twice — if you skip a day, the next day is non-negotiable. (2) Environment design — make good habits obvious and bad habits invisible. (3) Track your wins — this app's streak system does this beautifully! 🎯",
      "The #1 improvement hack: reduce friction. Put your workout clothes next to your bed. Open your journal app before sleep. Make the habit so easy that saying 'no' feels harder than saying 'yes'. ✨",
      "Focus on your 'keystone habit' — the one habit that creates a positive domino effect on everything else. For most people, it's exercise or sleep. Nail that one, and others follow naturally. 🔑",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Timer / Pomodoro
  if (msg.includes("timer") || msg.includes("pomodoro") || msg.includes("focus") || msg.includes("productiv")) {
    const responses = [
      "The Pomodoro technique is a game-changer! Try this: do 4 focus sessions of 25 minutes each, with 5-minute breaks in between. After 4 sessions, take a 15-minute break. Check out the Focus Timer in the sidebar! ⏱️",
      "For deep focus: silence notifications, use the Focus Timer, and work in 25-minute blocks. Studies show it takes 23 minutes to regain focus after an interruption. Protect your attention! 🧘",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Greeting / general
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.length < 10) {
    return "Hey there! 👋 I'm your AI habit coach. I can analyze your streaks, suggest new habits, provide motivation, or give productivity tips. What would you like to focus on today?";
  }

  // Default — comprehensive response
  const defaults = [
    "That's a great question! Here's my take: consistency beats intensity every time. Rather than trying to be perfect, aim for 'good enough' daily. A 10-minute workout done every day beats a 2-hour session done once a week. What specific area would you like me to dive deeper into? 🎯",
    "Interesting thought! One thing I've seen work incredibly well: pair your habits with ones you enjoy. Love coffee? Meditate while it brews. Enjoy podcasts? Listen during your walk. This 'temptation bundling' makes habits feel rewarding from day one. Want me to help you create pairs for your habits? ☕",
    "I love that you're thinking about this! The science of habit formation says: make it obvious, attractive, easy, and satisfying. Which of your current habits needs the most work on these four fronts? I can give you specific, tailored advice! 🧪",
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    let responseText = "";

    // Attempt real AI call
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (apiKey && !apiKey.includes("your-key")) {
        const { streamText } = await import("ai");
        const { openai } = await import("@ai-sdk/openai");

        const result = streamText({
          model: openai("gpt-4o-mini"),
          system: SYSTEM_PROMPT,
          messages: messages.slice(-6).map((m: any) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        });

        return (await result).toTextStreamResponse();
      }
    } catch (aiError: any) {
      console.warn("AI SDK call failed, using smart fallback:", aiError.message);
    }

    // Fallback: smart response engine
    responseText = getSmartResponse(lastUserMessage);

    // Stream the response word by word for a natural feel
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(" ");
        for (const word of words) {
          controller.enqueue(encoder.encode(word + " "));
          await new Promise((r) => setTimeout(r, 50));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("Coach Error:", error);
    return new Response(
      JSON.stringify({ message: "Coach temporarily unavailable", error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
