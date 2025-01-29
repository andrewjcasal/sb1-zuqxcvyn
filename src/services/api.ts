import { API_ENDPOINTS } from '@/lib/config';

export interface AnalyzeResponse {
  business: {
    name: string;
    industry: string;
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    services: Array<{
      name: string;
      description: string;
    }>;
    hours: {
      days: string;
      hours: string;
      emergencyService: boolean;
    };
    serviceArea: {
      regions: string[];
    };
  };
  metadata: {
    url: string;
    lastUpdated: string;
    confidence: number;
  };
}

export async function analyzeSite(url: string): Promise<AnalyzeResponse> {
  const response = await fetch(API_ENDPOINTS.ANALYZE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to analyze website');
  }

  return data;
} 