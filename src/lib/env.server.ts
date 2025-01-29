import { z } from 'zod';

const serverEnvSchema = z.object({
  SCRAPER_API_KEY: z.string().min(1, 'SCRAPER_API_KEY is required'),
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),
  BLAND_API_KEY: z.string().min(1, 'BLAND_API_KEY is required'),
  BLAND_API_URL: z.string().url('BLAND_API_URL must be a valid URL'),
  ENABLE_VOICE_CALLS: z.string().transform((val) => val === 'true'),
  FIRECRAWL_API_KEY: z.string().min(1, 'FIRECRAWL_API_KEY is required'),
  FIRECRAWL_API_URL: z.string().url('FIRECRAWL_API_URL must be a valid URL'),
});

export const serverEnv = serverEnvSchema.parse(process.env); 