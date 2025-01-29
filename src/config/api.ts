export const API_CONFIG = {
  SCRAPER: {
    URL: 'http://api.scraperapi.com',
    KEY: import.meta.env.VITE_SCRAPER_API_KEY || '',
    ENDPOINTS: {
      SCRAPE: '/scrape'
    }
  }
} as const;

export function isApiConfigured(api: 'scraper'): boolean {
  switch (api) {
    case 'scraper':
      return Boolean(API_CONFIG.SCRAPER.KEY);
    default:
      return false;
  }
}

export function getApiUrl(api: 'scraper', endpoint: string): string {
  return `${API_CONFIG.SCRAPER.URL}${endpoint}`;
}