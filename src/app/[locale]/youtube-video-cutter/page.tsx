import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { YoutubePreviewMockup } from "@/components/shared/YoutubePreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "YouTube Video Cutter – Trim & Cut YT Videos Online",
  description: "Easily grab YouTube videos in high resolution. No account required, just paste the link and enjoy fast, secure offline access.",
    alternates: getSeoAlternates("youtube-video-cutter", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("youtube-video-cutter", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip YouTube Video Cutter",
          description: "Trim, cut, and download specific segments of YouTube videos online for free.",
          ratingValue: "4.8",
          reviewCount: "6200"
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
          { name: "YouTube", item: `/${locale}/youtube-video-downloader` },
          { name: "Video Cutter", item: `/${locale}/youtube-video-cutter` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "YouTube", href: "/youtube-video-downloader" },
          { label: "Video Cutter", href: "/youtube-video-cutter" }
        ]} 
      />
      
      <SearchHeader {...header} />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tool Preview */}
          <RichArticle 
            sections={articleSections} 
            />
        </div>
      </div>

      <FeaturesSection platform="YouTube Cutter" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More YT Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/youtube-video-downloader" },
              { title: "MP3 Converter", href: "/youtube-to-mp3-converter" },
              { title: "Shorts Downloader", href: "/youtube-shorts-downloader" },
              { title: "Thumbnail Saver", href: "/youtube-thumbnail-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-red-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="YouTube Cutter" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <YoutubePreviewMockup type="cutter" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-red-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Extract the Best Parts!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Trim long YouTube videos and download only the segments you actually need in HD quality.
            </p>
            <Link 
                href={`/${locale}/youtube-video-cutter`}
                className="px-12 py-5 bg-white text-red-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Start Trimming
            </Link>
        </div>
      </section>
    </>
  )
}
