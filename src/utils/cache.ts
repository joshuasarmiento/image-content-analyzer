// Simple in-memory cache implementation
interface CacheEntry {
  data: any;
  expiry: number;
}

const cache = new Map<string, CacheEntry>();

/**
 * Set cache entry with expiration
 */
export function safeSetCache(key: string, data: any, ttlSeconds: number): void {
  try {
    const expiry = Date.now() + (ttlSeconds * 1000);
    cache.set(key, { data, expiry });
  } catch (error) {
    console.warn('Cache set failed:', error);
  }
}

/**
 * Get cache entry if not expired
 */
export function safeGetCache(key: string): any | null {
  try {
    const entry = cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiry) {
      cache.delete(key);
      return null;
    }
    
    return entry.data;
  } catch (error) {
    console.warn('Cache get failed:', error);
    return null;
  }
}

/**
 * Clear expired entries
 */
export function clearExpiredCache(): void {
  try {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (now > entry.expiry) {
        cache.delete(key);
      }
    }
  } catch (error) {
    console.warn('Cache cleanup failed:', error);
  }
}

/**
 * Clear all cache entries
 */
export function clearCache(): void {
  cache.clear();
}

// Export the cache instance for advanced usage
export { cache };