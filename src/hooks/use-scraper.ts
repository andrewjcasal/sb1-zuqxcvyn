import { useState } from 'react';
import { BusinessData, ScraperResult } from '../types';
import { getMockData } from '../utils/mock-data';

export function useScraper(): ScraperResult & { analyzeSite: (url: string) => Promise<void> } {
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<BusinessData | null>(null);
  const [error, setError] = useState<Error>();

  const analyzeSite = async (url: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      // In a real implementation, this would call the actual scraping service
      const data = await getMockData();
      setScrapedData(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to analyze site'));
      console.error('Error processing website:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    scrapedData,
    error,
    analyzeSite
  };
}