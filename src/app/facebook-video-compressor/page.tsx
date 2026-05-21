import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { FacebookPreviewMockup } from "@/components/shared/FacebookPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getToolSeoData("facebook-video-compressor", 'en');
  return { 
    title: seoData.meta?.title || "Facebook Video Compressor – Reduce FB Video Size Free | SavClip",
    description: seoData.meta?.description || "Reduce Facebook video file sizes online without losing original clarity. Compress large clips easily for seamless uploading to FB.",
    alternates: getSeoAlternates("facebook-video-compressor", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("facebook-video-compressor", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Facebook Video Compressor",
          description: "Reduce Facebook video file size online for free without quality loss.",
          ratingValue: "4.8",
          reviewCount: "1900"
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
          { name: "Facebook", item: `${locale === 'en' ? '' : '/' + locale}/facebook-video-downloader` },
          { name: "Video Compressor", item: `${locale === 'en' ? '' : '/' + locale}/facebook-video-compressor` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Facebook", href: "/facebook-video-downloader" },
          { label: "Video Compressor", href: "/facebook-video-compressor" }
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

      <FeaturesSection platform="Facebook Compressor" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More FB Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/facebook-video-downloader" },
              { title: "Reels Downloader", href: "/facebook-reels-downloader" },
              { title: "Audio Downloader", href: "/facebook-audio-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-blue-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Facebook Compressor" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <FacebookPreviewMockup type="video" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-blue-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Lighter Files, Same Brilliance!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Optimize your Facebook videos and save device storage with the world's most intelligent compressor.
            </p>
            <Link 
                href={`${locale === 'en' ? '' : '/' + locale}/facebook-video-compressor`}
                className="px-12 py-5 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Compress Video Now
            </Link>
        </div>
      </section>
    </>
  )
}
