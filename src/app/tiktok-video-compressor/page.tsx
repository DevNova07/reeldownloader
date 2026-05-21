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
  const seoData = await getToolSeoData("tiktok-video-compressor", 'en');
  return { 
    title: seoData.meta?.title || "TikTok Video Compressor – Reduce File Size Free",
    description: seoData.meta?.description || "Shrink TikTok video sizes online. Pass formatting limits easily by compressing video bitrates without causing pixelation.",
    alternates: getSeoAlternates("tiktok-video-compressor", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("tiktok-video-compressor", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip TikTok Video Compressor",
          description: "Compress and reduce the file size of TikTok videos online without losing quality.",
          ratingValue: "4.8",
          reviewCount: "3400"
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
          { name: "TikTok", item: `${locale === 'en' ? '' : '/' + locale}/tiktok-video-downloader` },
          { name: "Compressor", item: `${locale === 'en' ? '' : '/' + locale}/tiktok-video-compressor` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "TikTok", href: "/tiktok-video-downloader" },
          { label: "Compressor", href: "/tiktok-video-compressor" }
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

      <FeaturesSection platform="TikTok Video" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More Media Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/tiktok-video-downloader" },
              { title: "MP3 Downloader", href: "/tiktok-mp3-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-cyan-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="TikTok Video" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <TiktokPreviewMockup type="compressor" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-cyan-500 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Optimize Your Storage!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Compress bulky TikTok videos into lightweight MP4s perfect for WhatsApp or Email.
            </p>
            <Link 
                href={`${locale === 'en' ? '' : '/' + locale}/tiktok-video-compressor`}
                className="px-12 py-5 bg-white text-cyan-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Start Compressing
            </Link>
        </div>
      </section>
    </>
  )
}
