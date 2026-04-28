import { statsManager, PLATFORM_KEYS } from "@/utils/stats";

/**
 * Fetch with API key rotation for RapidAPI.
 */
export async function fetchWithRotation(
  url: string, 
  baseOptions: RequestInit, 
  platform: string
): Promise<Response> {
  const platKey = platform.toLowerCase();
  
  if (!statsManager.stats.platforms[platKey]) {
    statsManager.stats.platforms[platKey] = { total: 0, success: 0, fail: 0, keys: {} };
  }
  const platStats = statsManager.stats.platforms[platKey];
  const activeKeys = PLATFORM_KEYS[platKey] || PLATFORM_KEYS.global || [];
  
  statsManager.stats.totalRequests++;
  statsManager.stats.platforms[platKey].total++;

  let lastError: string | null = null;

  for (let i = 0; i < activeKeys.length; i++) {
    const key = activeKeys[i];

    if (!platStats.keys[key]) {
      platStats.keys[key] = {
        name: `API ${i + 1}`,
        status: "active",
        remaining: "unkn",
        limit: "unkn",
        used: 0,
        lastCheck: null
      };
    }

    const keyData = platStats.keys[key];
    if (keyData.status === "exhausted") continue;

    const optionsWithKey: RequestInit = {
      ...baseOptions,
      headers: {
        ...baseOptions.headers,
        "x-rapidapi-key": key,
        "x-rapidapi-host": (baseOptions.headers as any)?.["x-rapidapi-host"] || "",
        "Accept": "application/json",
      }
    };

    try {
      console.log(`[API] Attempting ${platKey} with key ${key.substring(0, 8)}...`);
      console.log(`[API] URL: ${url}`);
      
      const response = await fetch(url, optionsWithKey);
      
      const remaining = response.headers.get("x-ratelimit-requests-remaining");
      if (remaining) keyData.remaining = remaining;
      keyData.used++;
      keyData.lastCheck = new Date().toISOString();

      if (response.status === 429) {
        console.log(`[API] 429 Rate Limit hit for key ${key.substring(0, 8)}`);
        keyData.status = "exhausted";
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`[API] Error Body: ${errorText}`);
        lastError = `API Error ${response.status}: ${errorText}`;
        continue;
      }

      statsManager.stats.successfulRequests++;
      statsManager.stats.platforms[platKey].success++;
      statsManager.save();
      return response;
      
    } catch (err: any) {
      console.error(`[API] Fetch Exception: ${err.message}`);
      lastError = err.message;
      continue;
    }
  }

  statsManager.stats.failedRequests++;
  statsManager.stats.platforms[platKey].fail++;
  statsManager.save();
  throw new Error(lastError || "All API keys failed.");
}

/**
 * Resolves short URLs to their final destination.
 */
export async function resolveUrl(url: string): Promise<string> {
  const lowercaseUrl = url.toLowerCase();
  // Only attempt to resolve if it's a known short domain
  const isShort = /vt\.tiktok\.com|vm\.tiktok\.com|bit\.ly|t\.co|goo\.gl|fb\.watch|fb\.gg|fb\.me|facebook\.com\/share/.test(lowercaseUrl);
  
  if (!isShort) return url;

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    });
    return response.url;
  } catch (err) {
    console.error(`[RESOLVER] Failed to resolve URL ${url}:`, err);
    return url; // Return original if fails
  }
}

