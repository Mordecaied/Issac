import mongoose, { Document, Schema } from 'mongoose';

export interface ITimer extends Document {
  name: string;
  duration: number; // in minutes
  category: string;
  startTime?: Date;
  endTime?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TimerSchema: Schema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  category: { type: String, required: true },
  startTime: { type: Date },
  endTime: { type: Date },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<ITimer>('Timer', TimerSchema);