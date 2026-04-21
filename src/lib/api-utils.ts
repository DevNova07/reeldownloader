import { statsManager, PLATFORM_KEYS } from "@/utils/stats";

/**
 * Enhanced fetch with API key rotation and rate limit tracking.
 * Resolves several 'any' lint errors by adding proper typing.
 */
export async function fetchWithRotation(
  url: string, 
  baseOptions: RequestInit, 
  platform: string
): Promise<Response> {
  const platKey = platform.toLowerCase();
  // Ensure platform entry exists in stats
  if (!statsManager.stats.platforms[platKey]) {
    statsManager.stats.platforms[platKey] = { total: 0, success: 0, fail: 0, keys: {} };
  }
  const platStats = statsManager.stats.platforms[platKey];
  
  // Select the key pool for this platform, fallback to global
  const activeKeys = PLATFORM_KEYS[platKey] || PLATFORM_KEYS.global || [];
  
  statsManager.stats.totalRequests++;
  if (statsManager.stats.platforms[platKey]) {
    statsManager.stats.platforms[platKey].total++;
  }

  let lastError: string | null = null;

  // --- DEVELOPER MOCK MODE FALLBACK ---
  const isMockMode = process.env.NEXT_PUBLIC_DEV_MOCK_MODE === 'true';
  if (isMockMode) {
    return new Response(JSON.stringify({
      success: true,
      data: {
        title: "Mocked Viral Content",
        content: {
          cover_thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
          items: [{
            media_url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            type: "video",
            thumbnail_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
          }]
        },
        medias: [{
          url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
          type: "video",
          quality: "HD Video",
          extension: "mp4"
        }]
      }
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  for (let i = 0; i < activeKeys.length; i++) {
    const key = activeKeys[i];

    // Initialize key data if not present for this platform
    if (!platStats.keys[key]) {
      platStats.keys[key] = {
        name: `API ${i + 1}`,
        status: "active",
        remaining: "0",
        limit: "100",
        used: 0,
        lastCheck: null
      };
    }

    const keyData = platStats.keys[key];
    if (keyData.status === "exhausted") continue;

    console.log(`[API ROTATION] Trying key ${key.substring(0, 8)}... for ${platform} (${url})`);

    const options: RequestInit = {
      ...baseOptions,
      headers: {
        ...baseOptions.headers,
        "x-rapidapi-key": key,
        "Accept": "application/json",
      }
    };

    try {
      const response = await fetch(url, options);
      console.log(`[API ROTATION] Status: ${response.status} for ${platform}`);
      
      // Extract rate limit info
      const remaining = response.headers.get("x-ratelimit-requests-remaining") || 
                        response.headers.get("x-ratelimit-remaining") ||
                        response.headers.get("ratelimit-remaining");

      const limit = response.headers.get("x-ratelimit-requests-limit") || 
                    response.headers.get("x-ratelimit-limit") ||
                    response.headers.get("ratelimit-limit");
      
      if (remaining) keyData.remaining = remaining;
      if (limit) keyData.limit = limit;
      keyData.used++;
      keyData.lastCheck = new Date().toISOString();
      statsManager.save();

      if (response.status === 429) {
        console.warn(`[API QUOTA] Key ${key.substring(0, 8)}... exhausted for ${platKey}`);
        keyData.status = "exhausted";
        continue; // Try next key
      }

      if (response.status === 403) {
        console.error(`[API AUTH] Key ${key.substring(0, 8)}... not subscribed to ${platKey}. Auto-excluding...`);
        keyData.status = "exhausted"; // Auto-exclude non-subscribed keys
        statsManager.save();
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        lastError = `API Error ${response.status}: ${errorText}`;
        console.warn(`[API ERROR] ${platKey} request failed with status ${response.status}: ${errorText.substring(0, 100)}`);
        continue; // Try next key
      }

      statsManager.stats.successfulRequests++;
      if (statsManager.stats.platforms[platKey]) {
        statsManager.stats.platforms[platKey].success++;
      }
      statsManager.save();
      return response; // RETURN the successful response
      
    } catch (err: unknown) {
      lastError = err instanceof Error ? err.message : String(err);
      continue;
    }
  }

  statsManager.stats.failedRequests++;
  if (statsManager.stats.platforms[platKey]) {
    statsManager.stats.platforms[platKey].fail++;
  }
  statsManager.save();
  
  // Distinguish between all keys being exhausted vs other failures
  const allExhausted = activeKeys.every(k => platStats.keys[k]?.status === "exhausted");
  if (allExhausted) {
    throw new Error(`All ${platform} API keys are currently rate-limited (exhausted). Please try again in a few hours.`);
  }

  throw new Error(lastError || "All API keys failed to return a valid response");
}
