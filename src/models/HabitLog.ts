import mongoose, { Schema, model, models } from "mongoose";

const HabitLogSchema = new Schema(
  {
    habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    completedDate: { type: Date, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

// We want to ensure a user can only log a specific habit once per day
HabitLogSchema.index({ habitId: 1, completedDate: 1 }, { unique: true });

export const HabitLog = models.HabitLog || model("HabitLog", HabitLogSchema);
