import { API_CONFIG } from '@/config/api';
import { APIError } from '@/utils/errors';

interface ValidationResult {
  isValid: boolean;
  missingKeys: string[];
}

export function validateApiKeys(): ValidationResult {
  const hasFirecrawlKey = !!API_CONFIG.FIRECRAWL.KEY;

  return {
    isValid: hasFirecrawlKey,
    missingKeys: hasFirecrawlKey ? [] : ['Firecrawl API']
  };
}

export function validateAndThrow(): void {
  const { isValid, missingKeys } = validateApiKeys();
  
  if (!isValid) {
    throw new APIError(
      'Firecrawl API key is required. Please configure your API key in the admin panel.'
    );
  }
}