import { crawlWebsite } from '../firecrawl';
import { AgentService } from '../openai';
import { CallService } from '../bland/call-service';
import { APIError } from '@/utils/errors';
import { API_CONFIG } from '@/config/api';

export async function testApiConnections() {
  const results = {
    firecrawl: false,
    openai: false,
    bland: false,
    errors: [] as string[]
  };

  // Test Firecrawl API
  if (!API_CONFIG.FIRECRAWL.KEY) {
    results.errors.push('Firecrawl API key not configured. Please add VITE_FIRECRAWL_API_KEY to your .env file');
    return results;
  }

  try {
    // Only attempt to test if we have an API key
    const testUrl = 'https://www.example.com';
    await crawlWebsite(testUrl);
    results.firecrawl = true;
  } catch (error) {
    const message = error instanceof APIError ? error.message : 'Connection failed';
    results.errors.push(`Firecrawl: ${message}`);
  }

  return results;
}