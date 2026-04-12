import mongoose, { Schema, model, models } from "mongoose";

const HabitSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String, default: "🎯" },
    color: { type: String, default: "#8b5cf6" },
    frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: "daily" },
    targetDays: { type: Number, default: 7 },
    streak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Habit = models.Habit || model("Habit", HabitSchema);
