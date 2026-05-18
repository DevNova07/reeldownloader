import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { TikTokStoryCTA } from "./TikTokStoryCTA"
import Link from "next/link"
import { Ghost, Download, Shield, Zap, Eye } from "lucide-react"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "TikTok Story Downloader – View TT Stories Anonymously HD",
  description: "Looking to keep TikTok stories permanently? Use our intuitive online utility to get original files in seconds.",
    alternates: getSeoAlternates("tiktok-story-saver", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("tiktok-story-saver", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip TikTok Story Downloader",
          description: "Download TikTok stories and view them anonymously in HD quality for free.",
          ratingValue: "4.9",
          reviewCount: "6800"
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `/${locale}` },
          { name: "TikTok", item: `/${locale}/tiktok-video-downloader` },
          { name: "Story Saver", item: `/${locale}/tiktok-story-saver` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "TikTok", href: "/tiktok-video-downloader" },
          { label: "Story Saver", href: "/tiktok-story-saver" }
        ]} 
      />
      
      <SearchHeader {...header} />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Visual Tool Representation */}
          <div className="mb-20 rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800 bg-linear-to-br from-indigo-50 to-white dark:from-neutral-900 dark:to-neutral-950 p-8 md:p-16 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-pulse">
                <Ghost className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter mb-4 leading-tight">
                Anonymous Story Saver
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 font-bold max-w-2xl mb-12">
                Watch and save TikTok stories without being seen. 100% private and secure browsing.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {[
                    { label: "Anonymous", icon: <Eye className="h-5 w-5" /> },
                    { label: "HD Quality", icon: <Zap className="h-5 w-5" /> },
                    { label: "No Watermark", icon: <Shield className="h-5 w-5" /> },
                    { label: "Fast Save", icon: <Download className="h-5 w-5" /> }
                ].map((item, i) => (
                    <div key={i} className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 flex flex-col items-center gap-2">
                        <div className="text-indigo-600">{item.icon}</div>
                        <span className="text-xs font-black uppercase italic text-neutral-900 dark:text-white">{item.label}</span>
                    </div>
                ))}
            </div>
          </div>

          <RichArticle sections={articleSections} />
        </div>
      </div>

      <FeaturesSection platform="TikTok Story" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More TT Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/tiktok-video-downloader" },
              { title: "MP3 Downloader", href: "/tiktok-mp3-downloader" },
              { title: "Shorts Downloader", href: "/tiktok-shorts-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-indigo-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="TikTok Story" items={faqs} />

      

      {/* Blog & Guides Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest text-center mb-12 leading-tight">
            Story Viewer Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "How to View TT Stories Anonymously", desc: "The ultimate guide to staying hidden while watching content." },
              { title: "Archiving Disappearing TT Moments", desc: "Why you should save your favorite stories before they expire." },
              { title: "The Best TT Story Saver Apps 2026", desc: "Why SavClip's web-based tool is the superior choice." }
            ].map((blog, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-800 hover:border-indigo-500/30 transition-all">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{blog.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold mb-4">{blog.desc}</p>
                <Link href={`/${locale}`} className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:translate-x-1 transition-transform inline-block">Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryCards />

      <TikTokStoryCTA />
    </>
  )
}
