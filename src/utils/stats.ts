import fs from 'fs';
import path from 'path';

/**
 * API Key Pool Configuration.
 */
const ALL_KEYS: string[] = [];

export const PLATFORM_KEYS: Record<string, string[]> = {
  instagram: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  facebook: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  tiktok: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  youtube: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  twitter: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  telegram: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"],
  global: ["9ac29222efmsh81d43b990a8ce7dp17df2fjsn6f83cbfb17b7"]
};



export interface KeyStats {
  name: string;
  status: "active" | "exhausted";
  remaining: string;
  limit: string;
  used: number;
  lastCheck: string | null;
}

export interface PlatformStats {
  total: number;
  success: number;
  fail: number;
  keys: Record<string, KeyStats>;
}

export interface TopLink {
  url: string;
  title: string;
  platform: string;
  count: number;
  lastDownload: string;
}

export interface GlobalStats {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  savedRequests: number;
  totalVisits: number;
  platforms: Record<string, PlatformStats>;
  topLinks: TopLink[];
}

export interface AdvancedStats extends GlobalStats {
  realtime: {
    activeUsers: number;
    activityChart: number[];
  };
}

const STATS_FILE_PATH = path.join(process.cwd(), 'src/data/api-stats.json');

class StatsManager {
  private static instance: StatsManager;
  public stats: GlobalStats;
  private activeUsers: Map<string, number> = new Map(); // IP -> last seen timestamp
  private activityLog: number[] = []; // Timestamps of recent requests

  private constructor() {
    this.stats = this.loadStats();
    // Clean up inactive users every minute
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanupActiveUsers(), 60000);
    }
  }

  private createInitialStats(): GlobalStats {
    const platforms: Record<string, PlatformStats> = {};
    const platformList: string[] = ["facebook", "tiktok"];

    platformList.forEach(p => {
      platforms[p] = this.createPlatformEntry();
    });

    return {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      savedRequests: 0,
      totalVisits: 0,
      platforms,
      topLinks: []
    };
  }

  private createPlatformEntry(): PlatformStats {
    const keys: Record<string, KeyStats> = {};
    const firstKey = PLATFORM_KEYS.global[0];
    if (firstKey) {
      keys[firstKey] = {
        name: "API 1",
        status: "active",
        remaining: "unkn",
        limit: "unkn",
        used: 0,
        lastCheck: null
      };
    }
    return { total: 0, success: 0, fail: 0, keys };
  }

  private loadStats(): GlobalStats {
    try {
      if (fs.existsSync(STATS_FILE_PATH)) {
        const data = fs.readFileSync(STATS_FILE_PATH, 'utf-8');
        if (!data || data.trim() === '') return this.createInitialStats();

        const parsed = JSON.parse(data);
        const initial = this.createInitialStats();

        const loadedStats = {
          ...initial,
          ...parsed,
          platforms: {
            ...initial.platforms,
            ...(parsed.platforms || {})
          },
          topLinks: parsed.topLinks || [],
        } as GlobalStats;

        // Reset exhausted keys if they haven't been tried for 12 hours
        this.resetExhaustedKeys(loadedStats);
        return loadedStats;
      }
    } catch (error) {
      console.error("Error loading stats, returning default:", error);
    }
    return this.createInitialStats();
  }

  private resetExhaustedKeys(stats: GlobalStats): void {
    const TWELVE_HOURS = 12 * 60 * 60 * 1000;
    const now = Date.now();

    Object.keys(stats.platforms).forEach(pKey => {
      const platform = stats.platforms[pKey];
      if (platform.keys) {
        Object.keys(platform.keys).forEach(kKey => {
          const keyData = platform.keys[kKey];
          if (keyData.status === "exhausted" && keyData.lastCheck) {
            const lastCheckTime = new Date(keyData.lastCheck).getTime();
            if (now - lastCheckTime > TWELVE_HOURS) {
              keyData.status = "active";
              keyData.remaining = "unkn"; // Will be updated on next fetch
            }
          }
        });
      }
    });
  }

  public save(): void {
    try {
      const dir = path.dirname(STATS_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(this.stats, null, 2), 'utf-8');
    } catch (error) {
      console.error("Error saving stats:", error);
    }
  }

  public trackVisit(): void {
    this.stats.totalVisits = (this.stats.totalVisits || 0) + 1;
    this.save();
  }

  public trackCacheHit(): void {
    this.stats.savedRequests = (this.stats.savedRequests || 0) + 1;
    this.save();
  }

  public trackDownload(url: string, title: string, platform: string): void {
    this.stats.totalRequests = (this.stats.totalRequests || 0) + 1;
    this.stats.successfulRequests = (this.stats.successfulRequests || 0) + 1;

    if (!this.stats.topLinks) this.stats.topLinks = [];

    const existingIndex = this.stats.topLinks.findIndex(link => link.url === url);
    if (existingIndex !== -1) {
      this.stats.topLinks[existingIndex].count++;
      this.stats.topLinks[existingIndex].lastDownload = new Date().toISOString();
      this.stats.topLinks[existingIndex].title = title || this.stats.topLinks[existingIndex].title;
    } else {
      this.stats.topLinks.push({
        url,
        title: title || "Unknown Title",
        platform,
        count: 1,
        lastDownload: new Date().toISOString()
      });
    }

    this.stats.topLinks.sort((a, b) => b.count - a.count);
    if (this.stats.topLinks.length > 50) {
      this.stats.topLinks = this.stats.topLinks.slice(0, 50);
    }
    this.save();
  }

  public trackActivity(ip: string): void {
    const now = Date.now();
    this.activeUsers.set(ip, now);
    this.activityLog.push(now);

    if (this.activityLog.length > 2000) {
      this.activityLog = this.activityLog.slice(-2000);
    }
  }

  private cleanupActiveUsers(): void {
    const now = Date.now();
    const fiveMinutesAgo = now - 5 * 60 * 1000;

    const usersToDelete: string[] = [];
    this.activeUsers.forEach((lastSeen, ip) => {
      if (lastSeen < fiveMinutesAgo) {
        usersToDelete.push(ip);
      }
    });

    usersToDelete.forEach(ip => this.activeUsers.delete(ip));

    const thirtyMinutesAgo = now - 30 * 60 * 1000;
    this.activityLog = this.activityLog.filter(ts => ts > thirtyMinutesAgo);
  }

  public getStats(): AdvancedStats {
    const now = Date.now();
    const chartData: number[] = [];

    for (let i = 29; i >= 0; i--) {
      const bucketStart = now - (i + 1) * 60 * 1000;
      const bucketEnd = now - i * 60 * 1000;
      const count = this.activityLog.filter(ts => ts >= bucketStart && ts < bucketEnd).length;
      chartData.push(count);
    }

    return {
      ...this.stats,
      realtime: {
        activeUsers: this.activeUsers.size,
        activityChart: chartData
      }
    };
  }

  public static getInstance(): StatsManager {
    if (!StatsManager.instance) {
      StatsManager.instance = new StatsManager();
    }
    return StatsManager.instance;
  }
}

export const statsManager = StatsManager.getInstance();
