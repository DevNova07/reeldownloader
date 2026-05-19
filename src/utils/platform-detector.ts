export function getPlatformFromUrl(url: string): string | null {
  if (!url) return null;
  const lowercaseUrl = url.toLowerCase();
  
  // High-fidelity detection with regex to handle various TLDs and subdomains
  if (/(instagram\.com|instagr\.am)/.test(lowercaseUrl)) return 'instagram';
  if (/tiktok\.com/.test(lowercaseUrl)) return 'tiktok';
  if (/(facebook\.com|fb\.watch|fb\.com|facebook\.(\w+))/.test(lowercaseUrl)) return 'facebook';
  if (/snapchat\.com/.test(lowercaseUrl)) return 'snapchat';
  if (/(youtube\.com|youtu\.be)/.test(lowercaseUrl)) return 'youtube';
  if (/(t\.me|telegram)/.test(lowercaseUrl) || lowercaseUrl.startsWith('@')) return 'telegram';
  if (/(twitter\.com|x\.com)/.test(lowercaseUrl)) return 'twitter';
  
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
    tiktok: '/tiktok-video-downloader',
    facebook: '/facebook-video-downloader',
    snapchat: '/snapchat-video-downloader',
    youtube: '/youtube-video-downloader',
    twitter: '/x-video-downloader',
    telegram: '/telegram-video-downloader'
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
    tiktok: '/tiktok-video-downloader',
    facebook: '/facebook-video-downloader',
    snapchat: '/snapchat-video-downloader',
    youtube: '/youtube-video-downloader',
    twitter: '/x-video-downloader',
    telegram: '/telegram-video-downloader'
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

/**
 * Advanced micro-router matching URL structure to exact, high-performance SEO page paths.
 */
export function getPreciseRouteFromUrl(url: string): string | null {
  if (!url) return null;
  const lowercaseUrl = url.toLowerCase();

  // --- YOUTUBE ---
  if (/(youtube\.com|youtu\.be)/.test(lowercaseUrl)) {
    if (lowercaseUrl.includes('/playlist?list=') || lowercaseUrl.includes('list=')) {
      return '/youtube-playlist-downloader';
    }
    if (lowercaseUrl.includes('/shorts/')) {
      return '/youtube-shorts-downloader';
    }
    if (lowercaseUrl.includes('music.youtube.com') || lowercaseUrl.includes('audio') || lowercaseUrl.includes('mp3') || lowercaseUrl.includes('/to-mp3')) {
      return '/youtube-to-mp3-converter';
    }
    if (lowercaseUrl.includes('thumbnail') || lowercaseUrl.includes('img.youtube.com')) {
      return '/youtube-thumbnail-downloader';
    }
    return '/youtube-video-downloader';
  }

  // --- INSTAGRAM ---
  if (/(instagram\.com|instagr\.am)/.test(lowercaseUrl)) {
    if (/\/reel\//.test(lowercaseUrl) || /\/reels\//.test(lowercaseUrl) || lowercaseUrl.includes('reel')) {
      return '/instagram-reels-downloader';
    }
    if (/\/stories\//.test(lowercaseUrl) || /\/story\//.test(lowercaseUrl) || lowercaseUrl.includes('story')) {
      return '/instagram-story-viewer';
    }
    if (/\/p\//.test(lowercaseUrl)) {
      return '/instagram-photo-downloader';
    }
    if (lowercaseUrl.includes('/tv/') || lowercaseUrl.includes('/video/')) {
      return '/instagram-video-downloader';
    }
    if (lowercaseUrl.includes('audio') || lowercaseUrl.includes('music') || lowercaseUrl.includes('mp3')) {
      return '/instagram-audio-downloader';
    }
    if (lowercaseUrl.includes('carousel')) {
      return '/instagram-carousel-downloader';
    }
    if (lowercaseUrl.includes('profile') || lowercaseUrl.includes('/u/') || lowercaseUrl.includes('dp')) {
      return '/instagram-dp-downloader';
    }
    return '/instagram-reels-downloader';
  }

  // --- FACEBOOK ---
  if (/(facebook\.com|fb\.watch|fb\.com|facebook\.(\w+))/.test(lowercaseUrl)) {
    if (lowercaseUrl.includes('/reel/') || lowercaseUrl.includes('/reels/') || lowercaseUrl.includes('reel')) {
      return '/facebook-reels-downloader';
    }
    if (lowercaseUrl.includes('/stories/') || lowercaseUrl.includes('/story/') || lowercaseUrl.includes('/story.php')) {
      return '/facebook-story-saver';
    }
    if (lowercaseUrl.includes('/photo') || lowercaseUrl.includes('/photos/') || lowercaseUrl.includes('photo.php')) {
      return '/facebook-photo-downloader';
    }
    if (lowercaseUrl.includes('audio') || lowercaseUrl.includes('music') || lowercaseUrl.includes('mp3')) {
      return '/facebook-audio-downloader';
    }
    if (lowercaseUrl.includes('profile') || lowercaseUrl.includes('dp')) {
      return '/facebook-dp-downloader';
    }
    return '/facebook-video-downloader';
  }

  // --- TIKTOK ---
  if (/tiktok\.com/.test(lowercaseUrl)) {
    if (lowercaseUrl.includes('/music/') || lowercaseUrl.includes('music') || lowercaseUrl.includes('mp3')) {
      return '/tiktok-mp3-downloader';
    }
    if (lowercaseUrl.includes('/photo/') || lowercaseUrl.includes('photo')) {
      return '/tiktok-photo-downloader';
    }
    return '/tiktok-video-downloader';
  }

  // --- SNAPCHAT ---
  if (/snapchat\.com/.test(lowercaseUrl)) {
    if (lowercaseUrl.includes('/spotlight/') || lowercaseUrl.includes('spotlight')) {
      return '/snapchat-spotlight-downloader';
    }
    if (lowercaseUrl.includes('/story/') || lowercaseUrl.includes('story') || lowercaseUrl.includes('stories')) {
      return '/snapchat-stories-downloader';
    }
    if (lowercaseUrl.includes('/photo/') || lowercaseUrl.includes('photo')) {
      return '/snapchat-photo-downloader';
    }
    return '/snapchat-video-downloader';
  }

  // --- X (TWITTER) ---
  if (/(twitter\.com|x\.com)/.test(lowercaseUrl)) {
    if (lowercaseUrl.includes('gif')) {
      return '/x-gif-downloader';
    }
    if (lowercaseUrl.includes('profile') || lowercaseUrl.includes('photo') || lowercaseUrl.includes('picture')) {
      return '/x-profile-picture-downloader';
    }
    return '/x-video-downloader';
  }

  // --- TELEGRAM ---
  if (/(t\.me|telegram)/.test(lowercaseUrl) || lowercaseUrl.startsWith('@')) {
    if (/\/c\//.test(lowercaseUrl)) {
      return '/telegram-restricted-content-downloader';
    }
    if (lowercaseUrl.includes('file') || lowercaseUrl.includes('document')) {
      return '/telegram-file-downloader';
    }
    if (lowercaseUrl.includes('photo') || lowercaseUrl.includes('image')) {
      return '/telegram-photo-downloader';
    }
    return '/telegram-video-downloader';
  }

  return null;
}

