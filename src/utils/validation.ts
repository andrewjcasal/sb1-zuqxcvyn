import { z } from 'zod';
import { BusinessInfo } from '@/types/business';
import { APIError } from './errors';

const phoneRegex = /^\+?1?\d{10,15}$/;

export function validatePhoneNumber(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function validateUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateBusinessData(data: unknown): BusinessInfo {
  // Basic validation - in a real app we'd want more thorough validation
  if (!data || typeof data !== 'object') {
    throw new APIError('Invalid business data format');
  }

  return data as BusinessInfo;
}