export const API_ENDPOINTS = {
  ANALYZE: '/api/analyze',
  CALL: '/api/call',
  OPENAI: '/api/openai',
  CRAWL: '/api/crawl',
} as const;

export const API_URLS = {
  SCRAPER: 'http://api.scraperapi.com',
  BLAND: process.env.NEXT_PUBLIC_BLAND_API_URL || 'https://api.bland.ai',
} as const; 