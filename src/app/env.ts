import { z } from 'zod';

const envSchema = z.object({
  SCRAPER_API_KEY: z.string().min(1, 'SCRAPER_API_KEY is required'),
  ENABLE_VOICE_CALLS: z.string().transform((val) => val === 'true'),
});

export const env = envSchema.parse(process.env); 