import { FirecrawlResponse } from '@/services/firecrawl';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const cache = new Map<string, CacheItem<any>>();

export function getCachedData<T>(key: string): T | null {
  const item = cache.get(key);
  if (!item) {
    console.debug(`Cache miss for key: ${key}`);
    return null;
  }

  const isExpired = Date.now() - item.timestamp > CACHE_DURATION;
  if (isExpired) {
    console.debug(`Cache expired for key: ${key}`);
    cache.delete(key);
    return null;
  }

  console.debug(`Cache hit for key: ${key}`, {
    age: Math.round((Date.now() - item.timestamp) / 1000) + 's',
    data: item.data
  });
  return item.data;
}

export function setCachedData<T>(key: string, data: T): void {
  console.debug(`Caching data for key: ${key}`, {
    timestamp: new Date().toISOString(),
    data
  });
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// Helper to inspect cache contents
export function inspectCache(): void {
  console.debug('Current cache contents:', {
    size: cache.size,
    keys: Array.from(cache.keys()),
    entries: Array.from(cache.entries()).map(([key, item]) => ({
      key,
      age: Math.round((Date.now() - item.timestamp) / 1000) + 's',
      data: item.data
    }))
  });
}