import { API_CONFIG } from '@/config/api';
import { BusinessInfo } from '@/types/business';
import { APIError } from '@/utils/errors';

export interface FirecrawlResponse {
  business: BusinessInfo;
  metadata: {
    url: string;
    lastUpdated: string;
    confidence: number;
  };
}

export async function crawlWebsite(url: string): Promise<FirecrawlResponse> {
  try {
    // Validate URL
    if (!url.startsWith('http')) {
      throw new APIError('Please enter a valid URL starting with http:// or https://');
    }

    // Verify API key is available
    if (!API_CONFIG.FIRECRAWL.KEY) {
      throw new APIError('Please configure your Firecrawl API key in the .env file');
    }

    // Make API request
    const response = await fetch(API_CONFIG.FIRECRAWL.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.FIRECRAWL.KEY}`
      },
      body: JSON.stringify({
        url,
        options: {
          depth: 2,
          includeImages: false,
          extractContacts: true,
          extractServices: true,
          extractHours: true,
          extractLocations: true
        }
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new APIError('Invalid API key. Please check your Firecrawl API key in the .env file');
      }
      throw new APIError('Failed to analyze website. Please try again later');
    }

    const data = await response.json();
    
    if (!data.business || !data.metadata) {
      throw new APIError('Invalid response format from API');
    }

    return data;

  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        throw new APIError('Network error. Please check your internet connection and try again.');
      }
      throw new APIError(error.message);
    }
    
    throw new APIError('Failed to analyze website. Please try again.');
  }
}