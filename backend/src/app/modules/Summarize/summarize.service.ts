import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { GoogleGenAI } from '@google/genai';
import { createClient } from 'redis';
import crypto from 'crypto';
import status from 'http-status';
import { AppError, Logger } from '../../utils';
import config from '../../config';

// Initialize Google GenAI
const genAI = new GoogleGenAI({
  apiKey: config.gemini_api_key!,
});

// Initialize Redis
const redis = createClient({ url: config.redis_url });
redis.connect().catch((err) => Logger.error('Redis connection failed:', err));

// Generate a SHA-256 hash for caching
const hashContent = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

// Extract text from .txt or .docx files
const extractText = async (filePath: string): Promise<string> => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.txt') {
    return fs.promises.readFile(filePath, 'utf-8');
  }

  if (ext === '.docx') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  throw new AppError(status.BAD_REQUEST, 'Unsupported file type');
};

// Generate or retrieve summary
const summarizeFromFile = async (file: Express.Multer.File) => {
  if (!file) {
    throw new AppError(status.BAD_REQUEST, 'No file provided');
  }

  const fileText = await extractText(file.path);
  const contentHash = hashContent(fileText);

  try {
    // Check Redis cache
    const cachedSummary = await redis.get(contentHash);
    if (cachedSummary) {
      await fs.promises.unlink(file.path);
      return { summary: cachedSummary, cached: true };
    }

    // Call Gemini to generate summary
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Summarize the following:\n\n${fileText}` }],
        },
      ],
    });

    const summary = result.text;

    if (!summary) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'No summary returned by Gemini'
      );
    }

    // Cache the summary
    await redis.set(contentHash, summary, { EX: 60 * 60 * 24 }); // 24 hours

    // Clean up the uploaded file
    await fs.promises.unlink(file.path);

    return { summary, cached: false };
  } catch (error: any) {
    await fs.promises.unlink(file.path);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      error.message || 'Failed to summarize content'
    );
  }
};

export const SummarizeService = {
  summarizeFromFile,
};
