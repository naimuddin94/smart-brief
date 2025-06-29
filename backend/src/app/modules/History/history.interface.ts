import { Document, Types } from 'mongoose';

export interface IHistory extends Document {
  user: Types.ObjectId;
  content: string;
  summary: string;
  tags: string[];
  totalWord: number;
  summaryWord: number;
  reduction: number;
  savedTime: number;
  createdAt: Date;
}
