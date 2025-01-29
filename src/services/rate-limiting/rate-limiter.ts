import { APIError } from '@/utils/errors';

interface RateLimitConfig {
  maxRequests: number;  // Maximum requests allowed
  windowMs: number;     // Time window in milliseconds
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private limits: Map<string, RateLimitEntry>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig = { maxRequests: 60, windowMs: 60000 }) {
    this.limits = new Map();
    this.config = config;
  }

  async checkLimit(key: string): Promise<void> {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now >= entry.resetTime) {
      // Initialize new window
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs
      });
      return;
    }

    if (entry.count >= this.config.maxRequests) {
      const waitTime = Math.ceil((entry.resetTime - now) / 1000);
      throw new APIError(
        `Rate limit exceeded. Please try again in ${waitTime} seconds.`,
        429
      );
    }

    // Increment counter
    entry.count++;
    this.limits.set(key, entry);
  }

  getRemainingRequests(key: string): number {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now >= entry.resetTime) {
      return this.config.maxRequests;
    }

    return Math.max(0, this.config.maxRequests - entry.count);
  }

  getResetTime(key: string): number | null {
    const entry = this.limits.get(key);
    return entry ? entry.resetTime : null;
  }
}