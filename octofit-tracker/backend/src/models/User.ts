import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string;
  age?: number;
  team?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String },
    age: { type: Number, min: 0 },
    team: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password') || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

export const User = mongoose.model<IUser>('User', userSchema);
export { SALT_ROUNDS };
