import { IUser } from './../User/user.interface';
import status from 'http-status';
import { AppError, Logger } from '../../utils';
import crypto from 'crypto';
import { createClient } from 'redis';
import config from '../../config';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import User from '../User/user.model';
import History from '../History/history.model';
import { ROLE } from '../User/user.constant';

// Redis Client Setup
const redis = createClient({ url: process.env.REDIS_URL });
redis.connect().catch((err) => Logger.error('Redis connection error:', err));

// Hash text content for caching
const hashContent = (text: string) =>
  crypto.createHash('sha256').update(text).digest('hex');

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

const summarizeFromText = async (
  user: IUser,
  payload: { content: string; type: string }
) => {
  const { content, type } = payload;

  if (!content || typeof content !== 'string') {
    throw new AppError(status.BAD_REQUEST, 'Invalid or empty text input');
  }

  const contentHash = hashContent(content.trim());

  // Check Redis cache
  try {
    const cached = await redis.get(`${contentHash}-${type}`);
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

  if (user?.credits <= 0 && user?.role !== 'admin') {
    throw new AppError(status.BAD_REQUEST, 'You have not enough credit');
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
      You are an AI assistant.

      Task:
      - Summarize the following content as effectively as possible.
      - Adapt the tone/style based on: "${type}".
      - Extract 3 relevant tags or keywords.
      - Return the following JSON object:

      {
        "summary": "string",
        "tags": ["tag1", "tag2", "tag3"],
      }

      Content:
      """
      ${content}
      """

      Return only the JSON object shown above. Do not include any other explanation or formatting.
        `.trim(),
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
    tags: string[];
    type: string;
    totalContentWordCount: number;
    summaryWordCount: number;
    reduceTime: number;
    reduction: number;
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

  const wordCount = content.split(' ').length;
  const summaryWordCount = summaryObj.summary.split(' ').length;

  summaryObj.type = type;
  summaryObj.totalContentWordCount = wordCount;
  summaryObj.summaryWordCount = summaryWordCount;
  summaryObj.reduceTime = Math.round((wordCount - summaryWordCount) / 100);
  summaryObj.reduction = Math.round(
    ((wordCount - summaryWordCount) / wordCount) * 100
  );

  // Store in Redis
  try {
    await redis.set(`${contentHash}-${type}`, JSON.stringify(summaryObj), {
      EX: 60 * 60 * 24,
    });
    Logger.info('Summary cached in Redis');
  } catch (err) {
    Logger.error('Redis set error:', err);
  }

  if (user?.role !== ROLE.ADMIN) {
    await User.findByIdAndUpdate(user._id, { $inc: { credits: -1 } });
  }

  await History.create({
    user: user._id,
    content,
    type,
    summary: summaryObj.summary,
    tags: summaryObj.tags,
    totalWord: wordCount,
    summaryWord: summaryWordCount,
    reduction: summaryObj.reduction,
    savedTime: summaryObj.reduceTime,
  });

  return {
    ...summaryObj,
    cached: false,
  };
};

export const SummarizeService = {
  summarizeFromText,
};
