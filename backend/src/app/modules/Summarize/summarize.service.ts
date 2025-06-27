import status from 'http-status';
import { AppError, Logger } from '../../utils';
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import axios from 'axios';
import { createClient } from 'redis';
import crypto from 'crypto';
import config from '../../config';

// Redis Client Setup
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().catch((err) => Logger.error('Redis connection error:', err));


// Helper function to hash content
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

  // Extract text from the file
  let fileText;
  try {
    fileText = await extractText(file.path);
    console.log('Extracted Text:', fileText); // Debugging: Log extracted text
  } catch (err) {
    console.error('Failed to extract text from file:', err);
    throw new AppError(status.BAD_REQUEST, 'Error extracting text from file');
  }

  const contentHash = hashContent(fileText);

  // Check if the summary is cached in Redis
  let cachedSummary;
  try {
    cachedSummary = await redis.get(contentHash);
    if (cachedSummary) {
      console.log('Cache hit: Returning cached summary');
      await fs.promises.unlink(file.path); // Clean up file
      return { summary: cachedSummary, cached: true };
    }
  } catch (err) {
    console.error('Error checking Redis cache:', err);
  }

  // Prepare the prompt for OpenAI API
  const prompt = `Summarize the following content:\n\n${fileText}`;

  // Call OpenAI API to generate summary
  let summary;
  try {
    console.log('Sending prompt to OpenAI API:', prompt); // Debugging: Log prompt
    const result = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003', // Use GPT-3 model (you can use GPT-4 if available)
        prompt: prompt,
        max_tokens: 200, // You can adjust the length of the summary
        temperature: 0.7, // Controls the creativity of the response
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.open_ai_key}`,
        },
      }
    );

    console.log('OpenAI response:', result.data); // Debugging: Log OpenAI response
    summary = result.data.choices[0].text.trim();
  } catch (error: any) {
    console.error('Error calling OpenAI API:', error?.response ? error?.response?.data : error?.message);
    throw new AppError(status.INTERNAL_SERVER_ERROR, 'Failed to generate summary');
  }

  // Cache the summary in Redis for 24 hours
  try {
    await redis.set(contentHash, summary, { EX: 60 * 60 * 24 }); // 24 hours cache
    console.log('Summary cached in Redis');
  } catch (err) {
    console.error('Error caching summary in Redis:', err);
  }

  // Clean up the uploaded file
  await fs.promises.unlink(file.path);

  return { summary, cached: false };
};

export const SummarizeService = {
  summarizeFromFile,
};
