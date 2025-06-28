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

// Hash text content for caching
const hashContent = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

const summarizeFromText = async (text: string) => {
  if (!text || typeof text !== 'string') {
    throw new AppError(status.BAD_REQUEST, 'Invalid or empty text input');
  }

  const contentHash = hashContent(text);

  // Check Redis cache
  try {
    const cached = await redis.get(contentHash);
    if (cached) {
      Logger.info('Cache hit: Returning cached summary');
      return {
        ...JSON.parse(cached),
        cached: true,
      };
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
          content: `
            Summarize the content below and return a strict JSON object.

            Instructions:
            1. Summarize the content in 2–3 clear sentences.
            2. Count the total words in the original content.
            3. Count the words in the summary.
            4. Estimate reading time saved (assume 100 words per minute).
            5. Return only the following JSON object (do not stringify it, and do not wrap inside another object):

            {
              "summary": "string",
              "totalContentWordCount": number,
              "summaryWordCount": number,
              "reduceTime": number
            }

            Content:
            """
            ${text}
            """
            Only return the JSON object above. Do not include explanations or formatting.
          `,
        },
      ],
      temperature: 0.7,
      top_p: 1,
      model,
    },
  });

  if (isUnexpected(response)) {
    const errorMessage =
      response?.body?.error?.message ||
      'Failed to generate summary. Please ensure the input is valid and try again.';
    throw new AppError(status.INTERNAL_SERVER_ERROR, errorMessage);
  }

  const resultText = response.body.choices[0].message.content?.trim();

  let summaryObj: {
    summary: string;
    totalContentWordCount: number;
    summaryWordCount: number;
    reduceTime: number;
  };

  try {
    summaryObj = JSON.parse(resultText!);
  } catch (err) {
    Logger.error('Failed to parse JSON summary:', resultText);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Invalid JSON format returned by model.'
    );
  }

  // Store in Redis
  try {
    await redis.set(contentHash, JSON.stringify(summaryObj), {
      EX: 60 * 60 * 24,
    });
    Logger.info('Summary cached in Redis');
  } catch (err) {
    Logger.error('Redis set error:', err);
  }

  return {
    ...summaryObj,
    cached: false,
  };
};

export const SummarizeService = {
  summarizeFromText,
};
