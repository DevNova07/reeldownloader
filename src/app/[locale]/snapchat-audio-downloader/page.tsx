import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { SnapchatCTA } from "../snapchat-video-downloader/SnapchatCTA"
import { SnapchatPreviewMockup } from "@/components/shared/SnapchatPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "Snapchat MP3 Downloader – Convert Snapchat Video to Audio",
  description: "A streamlined, 100% free solution for archiving Snapchat audio tracks. Experience lightning-fast speeds and pristine clarity.",
    alternates: getSeoAlternates("snapchat-audio-downloader", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("snapchat-audio-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Snapchat MP3 Downloader",
          description: "Convert Snapchat videos to high-quality MP3 audio files for free.",
          ratingValue: "4.9",
          reviewCount: "6500"
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
          { name: "Snapchat", item: `/${locale}/snapchat-video-downloader` },
          { name: "MP3 Downloader", item: `/${locale}/snapchat-audio-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Snapchat", href: "/snapchat-video-downloader" },
          { label: "MP3 Downloader", href: "/snapchat-audio-downloader" }
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

      <FeaturesSection platform="Snapchat Audio" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            More Snapchat Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/snapchat-video-downloader" },
              { title: "Spotlight Downloader", href: "/snapchat-spotlight-downloader" },
              { title: "Story Downloader", href: "/snapchat-stories-downloader" },
              { title: "Photo Downloader", href: "/snapchat-photo-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-yellow-500 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Snapchat Audio" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <SnapchatPreviewMockup type="audio" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <SnapchatCTA />
    </>
  )
}
