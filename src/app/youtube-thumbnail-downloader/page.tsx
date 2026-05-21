import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { YouTubeThumbnailCTA } from "./YouTubeThumbnailCTA"
import { YoutubePreviewMockup } from "@/components/shared/YoutubePreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getToolSeoData("youtube-thumbnail-downloader", 'en');
  return { 
    title: seoData.meta?.title || "YouTube Thumbnail Downloader HD – Save YT Thumbnails 4K",
    description: seoData.meta?.description || "Save YouTube video thumbnails in maximum 4K or Full HD resolutions. Download cover graphics instantly via links.",
    alternates: getSeoAlternates("youtube-thumbnail-downloader", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("youtube-thumbnail-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip YouTube Thumbnail Downloader",
          description: "Download high-resolution YouTube thumbnails and covers online for free.",
          ratingValue: "4.9",
          reviewCount: "8600"
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `${locale === 'en' ? '/' : '/' + locale}` },
          { name: "YouTube", item: `${locale === 'en' ? '' : '/' + locale}/youtube-video-downloader` },
          { name: "Thumbnail Downloader", item: `${locale === 'en' ? '' : '/' + locale}/youtube-thumbnail-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "YouTube", href: "/youtube-video-downloader" },
          { label: "Thumbnail Downloader", href: "/youtube-thumbnail-downloader" }
        ]} 
      />
      
      <SearchHeader 
        {...header} 
        h1Class="font-bold text-white mb-3 drop-shadow-md text-center tracking-tight leading-none whitespace-nowrap inline-block text-[21px] sm:text-4xl md:text-5xl lg:text-6xl"
      />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <RichArticle 
            sections={articleSections} 
            h2SizeClass="text-[17px] sm:text-3xl md:text-4xl"
          />
        </div>
      </div>

      <FeaturesSection platform="YouTube Thumbnail" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More YT Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/youtube-video-downloader" },
              { title: "Shorts Downloader", href: "/youtube-shorts-downloader" },
              { title: "MP3 Converter", href: "/youtube-to-mp3-converter" },
              { title: "Playlist Downloader", href: "/youtube-playlist-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-red-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="YouTube Thumbnail" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <YoutubePreviewMockup type="thumbnail" />
              </div>
        </div>
      </div>

      {/* Blog & Guides Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest text-center mb-12 leading-tight">
            Thumbnail Design Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Extracting 4K Thumbnails for Inspiration", desc: "How to use high-res covers to improve your own designs." },
              { title: "YouTube Shorts Thumbnail Best Practices", desc: "Why vertical covers need a different approach." },
              { title: "Organizing Your Visual Inspiration Library", desc: "How to safely store and categorize saved thumbnails." }
            ].map((blog, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-800 hover:border-red-500/30 transition-all">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-red-600 transition-colors">{blog.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold mb-4">{blog.desc}</p>
                <Link href={`${locale === 'en' ? '/' : '/' + locale}`} className="text-xs font-black uppercase tracking-widest text-red-600 hover:translate-x-1 transition-transform inline-block">Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryCards />

      <YouTubeThumbnailCTA />
    </>
  )
}
