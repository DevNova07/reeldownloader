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
  const seoData = await getToolSeoData("tiktok-dp-downloader", 'en');
  return { 
    title: seoData.meta?.title || "TikTok DP Downloader – Save TikTok Profile Pictures in HD",
    description: seoData.meta?.description || "Download TikTok profile pictures in full resolution. Save any creator",
    alternates: getSeoAlternates("tiktok-dp-downloader", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("tiktok-dp-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip TikTok DP Downloader",
          description: "Download TikTok Profile Pictures (DP) in Full HD resolution for free.",
          ratingValue: "4.8",
          reviewCount: "4100"
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `/` },
          { name: "TikTok", item: `/tiktok-video-downloader` },
          { name: "DP Downloader", item: `/tiktok-dp-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "TikTok", href: "/tiktok-video-downloader" },
          { label: "DP Downloader", href: "/tiktok-dp-downloader" }
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

      <FeaturesSection platform="TikTok Photo" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More TikTok Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/tiktok-video-downloader" },
              { title: "Story Saver", href: "/tiktok-story-saver" },
              { title: "Anonymous Viewer", href: "/anonymous-tiktok-viewer" },
              { title: "Photo Downloader", href: "/tiktok-photo-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-pink-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="TikTok Photo" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <TiktokPreviewMockup type="dp" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-pink-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Save Profile Pictures!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                View and download full HD TikTok profile photos anonymously with our secure tool.
            </p>
            <Link 
                href={`/tiktok-dp-downloader`}
                className="px-12 py-5 bg-white text-pink-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Download DP
            </Link>
        </div>
      </section>
    </>
  )
}
