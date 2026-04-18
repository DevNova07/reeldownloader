import fs from 'fs';
import path from 'path';
import { type PlatformResult } from '@/types/download';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const CACHE_FILE = path.join(DATA_DIR, 'download-cache.json');
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Cache Entry Interface to resolve 'any' lint errors.
 */
interface CacheEntry {
  data: PlatformResult;
  expiry: number;
}

class CacheManager {
  private cache: Record<string, CacheEntry> = {};

  constructor() {
    this.ensureDirectory();
    this.load();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(CACHE_FILE)) {
      fs.writeFileSync(CACHE_FILE, JSON.stringify({}), 'utf-8');
    }
  }

  private load() {
    try {
      if (fs.existsSync(CACHE_FILE)) {
        const data = fs.readFileSync(CACHE_FILE, 'utf-8');
        this.cache = JSON.parse(data);
        this.cleanExpired();
      }
    } catch (error) {
      console.warn("Cache loading failed, starting fresh.", error);
      this.cache = {};
    }
  }

  private save() {
    try {
      fs.writeFileSync(CACHE_FILE, JSON.stringify(this.cache, null, 2), 'utf-8');
    } catch (error) {
      console.error("Cache save failed:", error);
    }
  }

  private cleanExpired() {
    const now = Date.now();
    let changed = false;
    for (const key in this.cache) {
      if (this.cache[key].expiry < now) {
        delete this.cache[key];
        changed = true;
      }
    }
    if (changed) this.save();
  }

  public get(url: string): PlatformResult | null {
    const key = this.hashUrl(url);
    const entry = this.cache[key];
    
    if (entry && entry.expiry > Date.now()) {
      return entry.data;
    }
    
    if (entry) {
      delete this.cache[key];
      this.save();
    }
    
    return null;
  }

  public set(url: string, data: PlatformResult, ttl = DEFAULT_TTL) {
    const key = this.hashUrl(url);
    this.cache[key] = {
      data,
      expiry: Date.now() + ttl
    };
    this.save();
  }

  private hashUrl(url: string): string {
    // Basic hash logic (removing sensitive query params)
    const base = url.split('?')[0];
    return Buffer.from(base).toString('base64').substring(0, 50);
  }
}

export const cacheManager = new CacheManager();
