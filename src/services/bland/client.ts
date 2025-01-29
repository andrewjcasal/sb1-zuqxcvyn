import { BlandAPI } from './sdk';
import { env } from '@/config/env';

export const blandClient = new BlandAPI({
  apiKey: env.VITE_BLAND_API_KEY
});