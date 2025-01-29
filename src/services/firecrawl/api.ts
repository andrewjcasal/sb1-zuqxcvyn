"use client";

import { API_ENDPOINTS } from '@/lib/config';

export interface FirecrawlResponse {
  business: {
    name: string;
    description: string;
    services: string[];
    serviceArea: {
      regions: string[];
    };
    hours: {
      [key: string]: string;
    };
    contacts: {
      phone?: string;
      email?: string;
      address?: string;
    };
  };
  metadata: {
    url: string;
    timestamp: string;
  };
}

export async function crawlWebsite(url: string): Promise<FirecrawlResponse> {
  const response = await fetch(API_ENDPOINTS.CRAWL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to analyze website');
  }

  const data = await response.json();
  return data;
}