import { NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env.server';
import { validateUrl } from '@/utils/validation';

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

    // Make API request
    const response = await fetch(serverEnv.FIRECRAWL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serverEnv.FIRECRAWL_API_KEY}`
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
      let errorMessage = 'Failed to analyze website';
      
      switch (response.status) {
        case 401:
          errorMessage = 'Invalid API key. Please check the server configuration.';
          break;
        case 403:
          errorMessage = 'Access denied. Please verify API permissions.';
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

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.business || !data.metadata) {
      return NextResponse.json(
        { error: 'Invalid response format from API' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error in crawlWebsite:', error);

    if (error instanceof Error) {
      if (error.message.includes('fetch')) {
        return NextResponse.json(
          { error: 'Network error. Please check your internet connection.' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze website. Please try again.' },
      { status: 500 }
    );
  }
} 