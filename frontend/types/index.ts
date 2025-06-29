export type TNavItems = { name: string; href: string }[];

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  meta: TMeta | null;
  success: boolean;
};

export type TSummary = {
  summary: string;
  tags: string[];
  totalContentWordCount: number;
  summaryWordCount: number;
  reduceTime: number;
  reduction: number;
  cached: boolean;
};

export type TStats = {
  totalSavedTime: number;
  totalReduction: number;
  totalWordProcess: number;
  totalSummaryWord: number;
  totalSummary: number;
  lastWeekSummary: number;
};

export type TProfile = {
  _id: string;
  fullName: string;
  email: string;
  image: string | null;
  isSocialLogin: boolean;
  provider: string | null;
  role: string;
  credits: number;
  stats: TStats;
  lastActiveAt: Date;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type THistory = {
  _id: string;
  user: { fullName: string; email: string; credits: number; createdAt: Date };
  content: string;
  summary: string;
  tags: string[];
  totalWord: number;
  summaryWord: number;
  type: string;
  reduction: number;
  savedTime: number;
  createdAt: string;
};
