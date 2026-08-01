import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned?: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      trim: true,
      enum: ['running', 'walking', 'cycling', 'strength', 'swimming', 'other'],
    },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
