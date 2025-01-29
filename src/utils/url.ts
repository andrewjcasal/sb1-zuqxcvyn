export async function getFinalUrl(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow'
    });

    // Get the final URL after all redirects
    return response.url;
  } catch (error) {
    // If we can't check redirects, return the original URL
    return url;
  }
}

export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    
    // Remove trailing slashes
    let normalized = parsed.origin + parsed.pathname.replace(/\/+$/, '');
    
    // Add query parameters if they exist
    if (parsed.search) {
      normalized += parsed.search;
    }
    
    // Add hash if it exists
    if (parsed.hash) {
      normalized += parsed.hash;
    }
    
    return normalized;
  } catch {
    // If URL parsing fails, return the original
    return url;
  }
}