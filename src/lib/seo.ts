import { locales } from "@/i18n";

export const SITE_URL = "https://savclip.com";

/**
 * Generates SEO optimized alternates for Next.js Metadata.
 * English pages are treated as clean root URLs (no /en prefix).
 * @param path The relative path of the tool (e.g. "instagram-video-downloader")
 * @param currentLocale The current locale (defaults to 'en')
 * @returns Metadata alternates object with canonical and hreflang tags
 */
export function getSeoAlternates(path: string, currentLocale: string = 'en') {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const canonicalPath = cleanPath ? `/${cleanPath}` : `/`;

  const languages: Record<string, string> = {
    'x-default': canonicalPath,
    'en': canonicalPath,
  };

  return {
    canonical: canonicalPath,
    languages,
  };
}
