import { MetadataRoute } from "next"
import { locales } from "@/i18n"
import en from "@/dictionaries/en.json"

const SITE_URL = "https://savclip.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const seoPages = en.platforms.seo_pages
  const slugKeys = Object.keys(seoPages)

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 1. Static Pages (Home, About, etc.)
  const staticRoutes = [
    "", 
    "/instagram",
    "/facebook", 
    "/youtube", 
    "/tiktok", 
    "/snapchat", 
    "/telegram", 
    "/twitter", 
    "/hashtags",
    "/captions",
    "/bio",
    "/reel-script",
    "/viral-hooks",
    "/trending",
    "/bulk-downloader",
    "/about", 
    "/contact", 
    "/privacy-policy", 
    "/terms", 
    "/disclaimer",
    "/dmca",
    "/safety",
    "/faq",
    "/history"
  ]

  locales.forEach((locale) => {
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
    slugKeys.forEach((key) => {
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
