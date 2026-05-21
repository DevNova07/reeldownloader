import { MetadataRoute } from "next"
import fs from "fs"
import path from "path"
import { BLOG_POSTS } from "@/lib/blog-data"

export const revalidate = 86400 // Cache sitemap for 24 hours

const SITE_URL = "https://savclip.com"

let cachedSitemap: MetadataRoute.Sitemap | null = null
let lastCacheTime = 0
const CACHE_DURATION = 86400 * 1000

export default function sitemap(): MetadataRoute.Sitemap {
  const now = Date.now()
  if (cachedSitemap && (now - lastCacheTime < CACHE_DURATION)) {
    return cachedSitemap
  }

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Static Pages
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
    "/dmca"
  ]

  // Dynamic tool routes from the file system
  const appLocaleDir = path.join(process.cwd(), "src", "app")
  let dynamicTools: string[] = []

  try {
    const entries = fs.readdirSync(appLocaleDir, { withFileTypes: true })
    dynamicTools = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('[') && !entry.name.startsWith('_') && entry.name !== 'api' && entry.name !== 'share-target' && fs.existsSync(path.join(appLocaleDir, entry.name, "page.tsx")))
      .map(entry => `/${entry.name}`)
      .filter(route => !staticRoutes.includes(route))
  } catch (e) {
    console.error("Failed to read dynamic tools for sitemap", e)
  }

  // Static Routes
  staticRoutes.forEach((route) => {
    sitemapEntries.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: route === "" ? 1.0 : 0.8,
    })
  })

  // Dynamic Tool Routes
  dynamicTools.forEach((route) => {
    sitemapEntries.push({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    })
  })

  // Blog Posts
  BLOG_POSTS.forEach((post) => {
    sitemapEntries.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  })

  cachedSitemap = sitemapEntries
  lastCacheTime = now
  return sitemapEntries
}
