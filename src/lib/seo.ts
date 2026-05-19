import { locales, type Locale } from "@/i18n";

export const SITE_URL = "https://savclip.com";

/**
 * Generates SEO optimized alternates for Next.js Metadata
 * @param path The relative path of the tool (e.g., "", "instagram", "instagram/reels")
 * @param currentLocale The current locale
 * @returns Metadata alternates object with correct canonical and hreflang tags
 */
export function getSeoAlternates(path: string, currentLocale: string) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  const languages: Record<string, string> = {};
  
  // Generate hreflang for all supported locales
  locales.forEach((l) => {
    const localePath = l === 'en' ? '' : `/${l}`;
    // Set x-default to English (root)
    if (l === 'en') {
      languages['x-default'] = cleanPath ? `/${cleanPath}` : `/`;
    }
    languages[l] = cleanPath ? `${localePath}/${cleanPath}` : `${localePath || '/'}`;
  });

  const currentLocalePath = currentLocale === 'en' ? '' : `/${currentLocale}`;
  return {
    canonical: cleanPath ? `${currentLocalePath}/${cleanPath}` : `${currentLocalePath || '/'}`,
    languages,
  };
}
