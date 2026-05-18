import { MetadataRoute } from "next"
import { locales } from "@/i18n"
import fs from "fs"
import path from "path"
import { BLOG_POSTS } from "@/lib/blog-data"

export const revalidate = 86400 // Cache sitemap for 24 hours (statically cached via ISR)

const SITE_URL = "https://savclip.com"

// In-memory cache to guarantee sub-30ms response times even during background ISR revalidation
let cachedSitemap: MetadataRoute.Sitemap | null = null
let lastCacheTime = 0
const CACHE_DURATION = 86400 * 1000 // 24 hours in milliseconds

export default function sitemap(): MetadataRoute.Sitemap {
  const now = Date.now()
  if (cachedSitemap && (now - lastCacheTime < CACHE_DURATION)) {
    return cachedSitemap
  }

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 1. Static Legal & Utility Pages
  const staticRoutes = [
    "", 
    "/hashtags",
    "/captions",
    "/bio",
    "/about", 
    "/contact", 
    "/privacy-policy", 
    "/terms", 
    "/disclaimer",
    "/dmca",
    "/safety",
    "/faq"
  ]

  // 2. Read dynamically generated tool routes from the file system
  // We look into src/app/[locale] and find all directories that have a page.tsx
  // This ensures the sitemap is ALWAYS 100% accurate with the actual built pages.
  const appLocaleDir = path.join(process.cwd(), "src", "app", "[locale]")
  let dynamicTools: string[] = []
  
  try {
    const entries = fs.readdirSync(appLocaleDir, { withFileTypes: true })
    dynamicTools = entries
      .filter(entry => entry.isDirectory() && fs.existsSync(path.join(appLocaleDir, entry.name, "page.tsx")))
      .map(entry => `/${entry.name}`)
      // Filter out the static ones we already defined
      .filter(route => !staticRoutes.includes(route))
  } catch (e) {
    console.error("Failed to read dynamic tools for sitemap", e)
  }

  locales.forEach((locale) => {
    const localePath = locale === 'en' ? '' : `/${locale}`

    // Add Static Routes
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${SITE_URL}${localePath}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      })
    })

    // Add Dynamic Tool Routes
    dynamicTools.forEach((route) => {
      sitemapEntries.push({
        url: `${SITE_URL}${localePath}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      })
    })

    // 3. Add Blog Posts
    BLOG_POSTS.forEach((post) => {
      sitemapEntries.push({
        url: `${SITE_URL}${localePath}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  })

  cachedSitemap = sitemapEntries
  lastCacheTime = now
  return sitemapEntries
}
