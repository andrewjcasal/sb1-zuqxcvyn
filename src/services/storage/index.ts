import { BusinessInfo } from '@/types/business';

const STORAGE_KEY = 'service-genie-data';
const FEEDBACK_KEY = 'service-genie-feedback';
const CACHE_KEY = 'service-genie-cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

interface StoredData {
  url: string;
  phone: string;
  business: BusinessInfo;
  timestamp: number;
}

interface FeedbackData {
  businessId: string;
  callId: string;
  rating: number;
  comment: string;
  timestamp: string;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export function storeBusinessData(url: string, phone: string, business: BusinessInfo): void {
  try {
    const data: StoredData = {
      url,
      phone,
      business,
      timestamp: Date.now()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store business data:', error);
  }
}

export function getStoredBusinessData(): StoredData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve business data:', error);
    return null;
  }
}

export function storeFeedback(feedback: FeedbackData): void {
  try {
    // Get existing feedback
    const existingFeedback = getFeedback();
    
    // Add new feedback
    const updatedFeedback = [...existingFeedback, feedback];
    
    // Store updated feedback
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updatedFeedback));
  } catch (error) {
    console.error('Failed to store feedback:', error);
    throw error;
  }
}

export function getFeedback(): FeedbackData[] {
  try {
    const data = localStorage.getItem(FEEDBACK_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to retrieve feedback:', error);
    return [];
  }
}

export function getCachedData<T>(key: string): T | null {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const cacheData = JSON.parse(cache);
    const item = cacheData[key] as CacheItem<T> | undefined;

    if (!item) return null;

    // Check if cache is expired
    if (Date.now() - item.timestamp > CACHE_DURATION) {
      // Remove expired item
      deleteCachedData(key);
      return null;
    }

    return item.data;
  } catch (error) {
    console.error('Failed to retrieve cached data:', error);
    return null;
  }
}

export function setCachedData<T>(key: string, data: T): void {
  try {
    // Get existing cache
    const cache = localStorage.getItem(CACHE_KEY);
    const cacheData = cache ? JSON.parse(cache) : {};

    // Add new cache item
    cacheData[key] = {
      data,
      timestamp: Date.now()
    };

    // Store updated cache
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to store cached data:', error);
  }
}

export function deleteCachedData(key: string): void {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return;

    const cacheData = JSON.parse(cache);
    delete cacheData[key];

    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Failed to delete cached data:', error);
  }
}

export function clearCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
}