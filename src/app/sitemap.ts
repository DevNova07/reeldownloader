import { MetadataRoute } from "next"
import { locales } from "@/i18n"
import en from "@/dictionaries/en.json"

const SITE_URL = "https://instasnap.net"

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = en.platforms.seo_pages
  const slugKeys = Object.keys(seoPages)

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 1. Static Pages (Home, About, etc.)
  const staticRoutes = ["", "/about", "/contact", "/privacy-policy", "/terms", "/faq"]

  locales.forEach((locale) => {
    // Add static routes for each locale
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      })
    })

    // 2. Dynamic Tool Pages from Dictionary
    // Limit to top 50 slugs per locale to prevent sitemap bloat and build timeouts
    slugKeys.slice(0, 50).forEach((key) => {
      const slug = key.replace(/_/g, "-")
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      })
    })
  })

  return sitemapEntries
}
