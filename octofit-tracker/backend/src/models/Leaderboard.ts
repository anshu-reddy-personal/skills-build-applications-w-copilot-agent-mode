import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank?: number;
  period: string;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: {
      type: String,
      required: true,
      default: 'all-time',
      trim: true,
    },
  },
  { timestamps: true }
);

leaderboardSchema.index({ period: 1, points: -1 });

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
