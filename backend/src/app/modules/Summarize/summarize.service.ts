import status from 'http-status';
import { AppError, Logger } from '../../utils';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { GoogleGenerativeAI } from '@google/genai';
import { createClient } from 'redis';
import crypto from 'crypto';

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Redis Client
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().catch(err => Logger.error('Redis error:', err));

// Helper to hash content
const hashContent = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

// Extract text from file
const extractText = async (filePath: string): Promise<string> => {
  const ext = path.extname(filePath);
  if (ext === '.txt') {
    return fs.promises.readFile(filePath, 'utf-8');
  } else if (ext === '.docx') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }
  throw new AppError(status.BAD_REQUEST, 'Unsupported file type');
};

// Main summary function
const summarizeFromFile = async (file: Express.Multer.File) => {
  if (!file) throw new AppError(status.BAD_REQUEST, 'No file uploaded');

  const fileText = await extractText(file.path);
  const contentHash = hashContent(fileText);

  // Check cache
  const cachedSummary = await redis.get(contentHash);
  if (cachedSummary) {
    await fs.promises.unlink(file.path);
    return { summary: cachedSummary, cached: true };
  }

  // Generate summary
  const result = await model.generateContent(`Summarize this:\n\n${fileText}`);
  const summary = result.response.text();

  // Save to cache
  await redis.set(contentHash, summary, { EX: 60 * 60 * 24 }); // 24 hours cache

  await fs.promises.unlink(file.path); // clean up file
  return { summary, cached: false };
};

export const SummarizeService = {
  summarizeFromFile,
};
