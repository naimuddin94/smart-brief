import { Schema, model } from 'mongoose';
import { IHistory } from './history.interface';

const historySchema = new Schema<IHistory>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    totalWord: {
      type: Number,
      required: true,
    },
    summaryWord: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    reduction: {
      type: Number,
      required: true,
    },
    savedTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

const History = model<IHistory>('History', historySchema);

export default History;
