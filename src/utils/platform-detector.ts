export function getPlatformFromUrl(url: string): string | null {
  if (!url) return null;
  const lowercaseUrl = url.toLowerCase();
  
  // High-fidelity detection with regex to handle various TLDs and subdomains
  if (/(instagram\.com|instagr\.am)/.test(lowercaseUrl)) return 'instagram';
  if (/tiktok\.com/.test(lowercaseUrl)) return 'tiktok';
  if (/(facebook\.com|fb\.watch|fb\.com|facebook\.(\w+))/.test(lowercaseUrl)) return 'facebook';
  if (/snapchat\.com/.test(lowercaseUrl)) return 'snapchat';
  if (/(youtube\.com|youtu\.be)/.test(lowercaseUrl)) return 'youtube';
  if (/(twitter\.com|x\.com)/.test(lowercaseUrl)) return 'twitter';
  if (/(t\.me|telegram)/.test(lowercaseUrl) || lowercaseUrl.startsWith('@')) return 'telegram';
  
  return null;
}

/**
 * Checks if the URL belongs to ANY of our supported social platforms.
 */
export function isAnyPlatformUrl(url: string): boolean {
  return !!getPlatformFromUrl(url);
}

/**
 * Checks if the input is either a valid URL or a potential username
 */
export function isSmartInput(input: string): boolean {
  if (!input) return false;
  if (isAnyPlatformUrl(input)) return true;
  
  // Basic username validation: 1-30 chars, alphanumeric, underscore, dot
  const usernameRegex = /^@?[a-zA-Z0-9._]{1,30}$/;
  return usernameRegex.test(input);
}

/**
 * Generates a localized route for the target platform.
 */
export function getLocalizedRoute(platform: string, locale: string): string | null {
  const routes: Record<string, string> = {
    instagram: '/',
    tiktok: '/tiktok',
    facebook: '/facebook',
    snapchat: '/snapchat',
    youtube: '/youtube',
    twitter: '/twitter',
    telegram: '/telegram'
  };

  const baseRoute = routes[platform];
  if (!baseRoute) return null;

  // No prefix for default 'en' locale usually, but project uses /[locale]/ structure consistently.
  // We should respect the provided locale.
  return `/${locale}${baseRoute === '/' ? '' : baseRoute}`;
}

export function getRouteFromPlatform(platform: string): string | null {
  const routes: Record<string, string> = {
    instagram: '/',
    tiktok: '/tiktok',
    facebook: '/facebook',
    snapchat: '/snapchat',
    youtube: '/youtube',
    twitter: '/twitter',
    telegram: '/telegram'
  };
  return routes[platform] || null;
}

/**
 * Detects the platform of the current page based on the URL pathname.
 * Useful for 150+ SEO pages that follow platform-specific naming conventions.
 */
export function getPlatformFromPath(pathname: string): string | null {
  if (!pathname) return null;
  const path = pathname.toLowerCase();
  const parts = path.split('/').filter(Boolean);

  // Check for other platforms first to avoid false positives for Instagram (the home page)
  if (path.includes('tiktok')) return 'tiktok';
  if (path.includes('facebook') || path.includes('/fb-')) return 'facebook';
  if (path.includes('snapchat') || path.includes('snap-')) return 'snapchat';
  if (path.includes('youtube') || path.includes('/yt-')) return 'youtube';
  if (path.includes('twitter') || path.includes('/x-')) return 'twitter';
  if (path.includes('telegram') || path.includes('tele-')) return 'telegram';

  // If it's the root, a localized home (e.g. /en, /hi), or contains instagram keywords
  if (
    path === '/' || 
    parts.length === 0 || 
    (parts.length === 1 && parts[0].length <= 3) || // Locale codes like /en, /hi, /pt-br
    path.includes('/instagram') || 
    path.includes('/reels') || 
    path.includes('/story') || 
    path.includes('/photo')
  ) {
    return 'instagram';
  }

  return null;
}

/**
 * Detects if the input is a profile and redirects to Bulk Downloader
 */
export function handleSmartRedirect(input: string, locale: string, router: any): boolean {
  if (!input) return false;
  
  const isDirectMedia = /\/(p|reels|reel|stories|tv|s|v|shorts|video)\//.test(input.toLowerCase());
  const isProfileUrl = /(instagram\.com|facebook\.com|tiktok\.com|twitter\.com|x\.com|snapchat\.com)\/[a-zA-Z0-9._]+\/?$/.test(input.toLowerCase().split('?')[0]);
  const isGeneralUrl = /^(https?:\/\/)/.test(input.toLowerCase());

  let usernameToFetch = "";

  if (!isDirectMedia) {
    if (isProfileUrl) {
      const parts = input.split('?')[0].split('/').filter(Boolean);
      usernameToFetch = parts[parts.length - 1];
    } else if (!isGeneralUrl && !input.includes('/')) {
      usernameToFetch = input.replace('@', '').trim();
    }
  }

  if (usernameToFetch) {
    router.push(`/${locale}/bulk-downloader?username=${encodeURIComponent(usernameToFetch)}`);
    return true;
  }

  return false;
}

