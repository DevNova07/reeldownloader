import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { TiktokPreviewMockup } from "@/components/shared/TiktokPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "TikTok Song Finder – Identify Trending Audio",
  description: "Save your favorite TikTok media instantly without any logos. Our free online tool gives you crisp quality directly to your device.",
    alternates: getSeoAlternates("tiktok-song-finder", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("tiktok-song-finder", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip TikTok Song Finder",
          description: "Identify songs and download audio tracks from TikTok videos instantly.",
          ratingValue: "4.9",
          reviewCount: "5100"
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
          { name: "Song Finder", item: `/${locale}/tiktok-song-finder` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "TikTok", href: "/tiktok-video-downloader" },
          { label: "Song Finder", href: "/tiktok-song-finder" }
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

      <FeaturesSection platform="TikTok Audio" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More Audio Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "MP3 Downloader", href: "/tiktok-mp3-downloader" },
              { title: "Trending Hashtags", href: "/tiktok-trending-hashtag-generator" },
              { title: "Video Downloader", href: "/tiktok-video-downloader" },
              ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-pink-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="TikTok Audio" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <TiktokPreviewMockup type="song" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-pink-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Name That Tune!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Identify viral sounds and download the high-quality MP3 tracks instantly.
            </p>
            <Link 
                href={`/${locale}/tiktok-song-finder`}
                className="px-12 py-5 bg-white text-pink-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Find Song
            </Link>
        </div>
      </section>
    </>
  )
}
