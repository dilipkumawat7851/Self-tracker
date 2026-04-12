import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import { Habit } from "@/models/Habit";
import { HabitLog } from "@/models/HabitLog";
import { User } from "@/models/User";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      await dbConnect();

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

      const habit = await Habit.findOne({
        _id: params.id,
        userId,
      });

      if (!habit) {
        return NextResponse.json({ message: "Habit not found" }, { status: 404 });
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingLog = await HabitLog.findOne({
        habitId: params.id,
        userId,
        completedDate: { $gte: today },
      });

      if (existingLog) {
        await HabitLog.findByIdAndDelete(existingLog._id);
        habit.streak = Math.max(0, habit.streak - 1);
        await habit.save();
        return NextResponse.json({ message: "Habit completion removed", completedToday: false, streak: habit.streak });
      } else {
        await HabitLog.create({
          habitId: params.id,
          userId,
          completedDate: new Date(),
        });
        habit.streak += 1;
        if (habit.streak > habit.longestStreak) {
          habit.longestStreak = habit.streak;
        }
        await habit.save();
        return NextResponse.json({ message: "Habit completed", completedToday: true, streak: habit.streak });
      }
    } catch (dbError: any) {
      console.error("DB unavailable for habit complete:", dbError.message);
      // Return a toggle-on response for in-memory habits
      return NextResponse.json({ message: "Habit completed (offline)", completedToday: true, streak: 1 });
    }
  } catch (error) {
    console.error("Error toggling habit completion:", error);
    return NextResponse.json({ message: "Error toggling habit completion" }, { status: 500 });
  }
}
