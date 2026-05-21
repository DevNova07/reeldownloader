import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Remove '/_next/' so that Googlebot can load CSS, JS, and image assets for correct rendering
      disallow: ["/api/"],
    },
    sitemap: "https://savclip.com/sitemap.xml",
  }
}
