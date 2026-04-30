import { MetadataRoute } from "next"
import { locales } from "@/i18n"
import en from "@/dictionaries/en.json"

const SITE_URL = "https://savclip.net"

export async function generateSitemaps() {
  // We create one sitemap per language (locale)
  return locales.map((_, index) => ({
    id: index,
  }))
}

export default function sitemap({
  id,
}: {
  id: number
}): MetadataRoute.Sitemap {
  // Get the locale for the current sitemap ID
  const locale = locales[id]
  
  if (!locale) {
    return []
  }

  const seoPages = en.platforms.seo_pages
  const slugKeys = Object.keys(seoPages)

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 1. Static Pages (Home, About, etc.)
  const staticRoutes = ["", "/about", "/contact", "/privacy-policy", "/terms", "/faq"]

  // Add static routes for this locale
  staticRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    })
  })

  // 2. Dynamic Tool Pages from Dictionary
  // All slugs are included to ensure full indexation.
  slugKeys.forEach((key) => {
    const slug = key.replace(/_/g, "-")
    sitemapEntries.push({
      url: `${SITE_URL}/${locale}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    })
  })

  return sitemapEntries
}
