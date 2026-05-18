import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { TelegramPreviewMockup } from "@/components/shared/TelegramPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "Telegram Audio Downloader – Extract & Save TG MP3 Music",
  description: "Looking to keep Telegram audio tracks permanently? Use our intuitive online utility to get original files in seconds.",
    alternates: getSeoAlternates("telegram-audio-downloader", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("telegram-audio-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Telegram Audio Downloader",
          description: "Extract and convert Telegram videos to high-quality MP3 audio files for free.",
          ratingValue: "4.8",
          reviewCount: "5200"
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
          { name: "Telegram", item: `/${locale}/telegram-video-downloader` },
          { name: "Audio Downloader", item: `/${locale}/telegram-audio-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Telegram", href: "/telegram-video-downloader" },
          { label: "Audio Downloader", href: "/telegram-audio-downloader" }
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

      <FeaturesSection platform="Telegram" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More Telegram Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/telegram-video-downloader" },
              { title: "Photo Downloader", href: "/telegram-photo-downloader" },
              { title: "File Downloader", href: "/telegram-file-downloader" },
              { title: "Story Saver", href: "/telegram-story-saver" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-sky-500 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Telegram" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <TelegramPreviewMockup type="audio" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-sky-600 text-white px-4 border-t border-sky-500">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Extract TG Audio Instantly!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90 text-sky-100">
                Convert any public Telegram video or audio post to a high-quality MP3 file securely.
            </p>
            <Link 
                href={`/${locale}/telegram-audio-downloader`}
                className="px-12 py-5 bg-white text-sky-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                Convert to MP3
            </Link>
        </div>
      </section>
    </>
  )
}
