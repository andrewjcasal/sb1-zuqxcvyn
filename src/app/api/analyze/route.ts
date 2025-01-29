import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { extractBusinessInfo } from '@/services/firecrawl/extractor';
import { validateUrl } from '@/utils/validation';
import { serverEnv } from '@/lib/env.server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // Validate URL
    if (!validateUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format. Please provide a valid URL starting with http:// or https://' },
        { status: 400 }
      );
    }

    // Verify API key is available
    const scraperApiKey = serverEnv.SCRAPER_API_KEY;
    if (!scraperApiKey) {
      return NextResponse.json(
        { error: 'Scraper API key is not configured on the server' },
        { status: 500 }
      );
    }

    // Construct ScraperAPI URL with proper encoding
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://api.scraperapi.com/?api_key=${scraperApiKey}&url=${encodedUrl}`;

    // Create request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

    try {
      const response = await fetch(apiUrl, {
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

        return NextResponse.json({ error: errorMessage }, { status: response.status });
      }

      // Get HTML content
      const html = await response.text();
      
      if (!html || html.length < 100) {
        return NextResponse.json(
          { error: 'Failed to retrieve website content. The page might be empty or blocked.' },
          { status: 400 }
        );
      }

      // Extract business information
      const businessInfo = await extractBusinessInfo(html, url);

      // Validate extracted data
      if (!businessInfo.name || businessInfo.name === 'Unknown Business') {
        return NextResponse.json(
          { error: 'Could not extract business information from the website.' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        business: businessInfo,
        metadata: {
          url,
          lastUpdated: new Date().toISOString(),
          confidence: 0.8
        }
      });

    } catch (fetchError: unknown) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: 'The website is taking too long to respond. Please try again or try a different URL.' },
          { status: 408 }
        );
      }
      throw fetchError;
    }

  } catch (error) {
    console.error('Error in analyzeSite:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: error.message.includes('fetch') 
            ? 'Network error. Please check your internet connection.'
            : error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
} 