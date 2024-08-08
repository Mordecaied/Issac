import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  content: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewedAt?: Date;
  nextReviewDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
  content: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  lastReviewedAt: { type: Date },
  nextReviewDate: { type: Date },
}, { timestamps: true });

export default mongoose.model<IQuestion>('Question', QuestionSchema);