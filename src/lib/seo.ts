export const SITE_URL = "https://savclip.com";

/**
 * Generates SEO optimized alternates for Next.js Metadata.
 * English pages are treated as clean root URLs (no /en prefix).
 * @param path The relative path of the tool (e.g. "instagram-video-downloader")
 * @param currentLocale The current locale (defaults to 'en')
 * @returns Metadata alternates object with canonical tag only
 */
export function getSeoAlternates(path: string, currentLocale: string = 'en') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const canonicalUrl = cleanPath ? `${SITE_URL}/${cleanPath}` : `${SITE_URL}/`;

  return {
    canonical: canonicalUrl,
  };
}

