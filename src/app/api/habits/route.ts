import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import { Habit } from "@/models/Habit";
import { HabitLog } from "@/models/HabitLog";
import { User } from "@/models/User";

// In-memory store for when MongoDB is not available
const memoryHabits: Map<string, any[]> = new Map();

function getUserKey(session: any): string {
  return session?.user?.email || "anonymous";
}

// GET /api/habits - Get all habits for the logged in user
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      await dbConnect();

      // Map rogue Google OAuth string IDs to proper MongoDB ObjectIds
      let userId = (session.user as any).id;

      if (!mongoose.isValidObjectId(userId)) {
        let dbUser = await User.findOne({ email: session.user.email });

        if (!dbUser) {
          dbUser = await User.create({
            name: session.user.name || "User",
            email: session.user.email,
            image: session.user.image,
          });
        }
        userId = dbUser._id.toString();
      }

      const habits = await Habit.find({ userId }).sort({ createdAt: -1 });

      // Also get today's logs to attach `completedToday`
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const logs = await HabitLog.find({
        userId,
        completedDate: { $gte: today },
      });

      const completedHabitIds = new Set(logs.map((log) => log.habitId.toString()));

      const transformedHabits = habits.map((h) => {
        const habitObj = h.toObject();
        return {
          ...habitObj,
          id: habitObj._id.toString(),
          completedToday: completedHabitIds.has(habitObj._id.toString()),
        };
      });

      return NextResponse.json(transformedHabits);
    } catch (dbError: any) {
      console.error("DB unavailable for habits GET:", dbError.message);
      
      // Return in-memory habits or empty array
      const key = getUserKey(session);
      const stored = memoryHabits.get(key) || [];
      return NextResponse.json(stored);
    }
  } catch (error: any) {
    console.error("Error fetching habits:", error);
    return NextResponse.json({ message: "Error fetching habits", error: error?.message }, { status: 500 });
  }
}

// POST /api/habits - Create a new habit
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, description, icon, color, frequency, targetDays } = await req.json();

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    try {
      await dbConnect();

      // Map rogue Google OAuth string IDs to proper MongoDB ObjectIds
      let userId = (session.user as any).id;
      if (!mongoose.isValidObjectId(userId)) {
        let dbUser = await User.findOne({ email: session.user.email });
        if (!dbUser) {
          dbUser = await User.create({
            name: session.user.name || "User",
            email: session.user.email,
            image: session.user.image,
          });
        }
        userId = dbUser._id.toString();
      }

      const habit = await Habit.create({
        userId,
        name,
        description,
        icon,
        color,
        frequency,
        targetDays,
      });

      const habitObj = habit.toObject();
      return NextResponse.json({ ...habitObj, id: habitObj._id.toString(), completedToday: false }, { status: 201 });
    } catch (dbError: any) {
      console.error("DB unavailable for habits POST:", dbError.message);
      
      // Create habit in memory
      const key = getUserKey(session);
      const newHabit = {
        id: "mem_" + Date.now(),
        userId: (session.user as any).id || "local",
        name,
        description: description || "",
        icon: icon || "🎯",
        color: color || "#8b5cf6",
        frequency: frequency || "daily",
        targetDays: targetDays || 7,
        streak: 0,
        longestStreak: 0,
        isActive: true,
        completedToday: false,
        createdAt: new Date(),
      };

      const existing = memoryHabits.get(key) || [];
      existing.unshift(newHabit);
      memoryHabits.set(key, existing);

      return NextResponse.json(newHabit, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating habit:", error);
    return NextResponse.json({ message: "Error creating habit" }, { status: 500 });
  }
}
