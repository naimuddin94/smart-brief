import status from 'http-status';
import { AppError, Logger } from '../../utils';
import crypto from 'crypto';
import { createClient } from 'redis';
import config from '../../config';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

// Redis Client Setup
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().catch((err) => Logger.error('Redis connection error:', err));

// Helper function to hash content
const hashContent = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

const summarizeFromText = async (text: string) => {
  if (!text || typeof text !== 'string') {
    throw new AppError(status.BAD_REQUEST, 'Invalid or empty text input');
  }

  const contentHash = hashContent(text);

  try {
    const cachedSummary = await redis.get(contentHash);
    if (cachedSummary) {
      Logger.info('Cache hit: Returning cached summary');
      return { summary: cachedSummary, cached: true };
    }
  } catch (err) {
    Logger.error('Redis get error:', err);
  }

  const client = ModelClient(
    endpoint,
    new AzureKeyCredential(config.github_token!)
  );

  const response = await client.path('/chat/completions').post({
    body: {
      messages: [
        {
          role: 'user',
          content: `Summarize the following content:\n\n${text}`,
        },
      ],
      temperature: 1,
      top_p: 1,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    const errorMessage =
      response?.body?.error?.message ||
      'Failed to generate summary. Please ensure the input is valid and try again.';
    throw new AppError(status.INTERNAL_SERVER_ERROR, errorMessage);
  }

  const summary = response.body.choices[0].message.content;

  try {
    await redis.set(contentHash, summary!, { EX: 60 * 60 * 24 });
    Logger.info('Summary cached in Redis');
  } catch (err) {
    Logger.error('Redis set error:', err);
  }

  return { summary, cached: false };
};

export const SummarizeService = {
  summarizeFromText,
};
