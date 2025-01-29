import { API_CONFIG } from '@/config/api';
import { BusinessInfo } from '@/types/business';
import { APIError } from '@/utils/errors';
import { validateUrl } from '@/utils/validation';
import { extractBusinessInfo } from './extractor';

export interface CrawlResponse {
  business: BusinessInfo;
  metadata: {
    url: string;
    lastUpdated: string;
    confidence: number;
  };
}

export async function analyzeSite(url: string): Promise<CrawlResponse> {
  // Validate API key
  if (!API_CONFIG.SCRAPER.KEY) {
    throw new APIError(
      'ScraperAPI key is not configured. Please add VITE_SCRAPER_API_KEY to your .env file.',
      401
    );
  }

  // Validate URL
  if (!validateUrl(url)) {
    throw new APIError(
      'Invalid URL format. Please provide a valid URL starting with http:// or https://',
      400
    );
  }

  try {
    // Construct ScraperAPI URL with proper encoding
    const scraperUrl = new URL(API_CONFIG.SCRAPER.URL);
    scraperUrl.searchParams.set('api_key', API_CONFIG.SCRAPER.KEY);
    scraperUrl.searchParams.set('url', url);
    scraperUrl.searchParams.set('render', 'true');
    scraperUrl.searchParams.set('keep_headers', 'true');

    console.debug('Making request to ScraperAPI:', {
      url: scraperUrl.toString().replace(API_CONFIG.SCRAPER.KEY, '[REDACTED]')
    });

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(scraperUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml',
        'User-Agent': 'ServiceGenie/1.0'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = 'Failed to analyze website';
      
      switch (response.status) {
        case 400:
          errorMessage = 'Invalid request. Please verify the URL and try again.';
          break;
        case 401:
          errorMessage = 'Invalid API key. Please check your configuration.';
          break;
        case 403:
          errorMessage = 'Access denied. Please verify your API permissions.';
          break;
        case 404:
          errorMessage = 'Website not found. Please verify the URL is correct.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again in a few minutes.';
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again later.';
          break;
      }

      throw new APIError(errorMessage, response.status);
    }

    // Get HTML content
    const html = await response.text();
    
    if (!html || html.length < 100) {
      throw new APIError('Failed to retrieve website content. The page might be empty or blocked.');
    }

    // Extract business information
    const businessInfo = await extractBusinessInfo(html, url);

    // Validate extracted data
    if (!businessInfo.name || businessInfo.name === 'Unknown Business') {
      throw new APIError('Could not extract business information from the website.');
    }

    return {
      business: businessInfo,
      metadata: {
        url,
        lastUpdated: new Date().toISOString(),
        confidence: 0.8
      }
    };

  } catch (error) {
    console.error('Error in analyzeSite:', error);

    if (error instanceof APIError) {
      throw error;
    }
    
    if (error.name === 'AbortError') {
      throw new APIError(
        'Request timed out. The website might be slow or unresponsive.',
        408
      );
    }
    
    if (error instanceof Error) {
      throw new APIError(
        error.message.includes('fetch') 
          ? 'Network error. Please check your internet connection.'
          : error.message
      );
    }
    
    throw new APIError('Failed to analyze website. Please try again.');
  }
}

export const crawlWebsite = analyzeSite;