export type TNavItems = { name: string; href: string }[];

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TSummary = {
  summary: string;
  tags: string[];
  type: string;
  totalContentWordCount: number;
  summaryWordCount: number;
  reduceTime: number;
  reduction: number;
  cached: boolean;
};

export type TResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  meta: TMeta | null;
  success: boolean;
};
