export interface BusinessData {
  services: string[];
  location: string;
  hours: string;
  areaServed: string;
}

export interface ScraperResult {
  isLoading: boolean;
  scrapedData: BusinessData | null;
  error?: Error;
}