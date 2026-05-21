import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { XPreviewMockup } from "@/components/shared/XPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getToolSeoData("x-banner-downloader", 'en');
  return { 
    title: seoData.meta?.title || "X Banner Downloader – Save Twitter Header Images HD | SavClip",
    description: seoData.meta?.description || "Save X (Twitter) header images and profile banners in original aspect ratios and crisp high-definition formats.",
    alternates: getSeoAlternates("x-banner-downloader", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("x-banner-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip X Banner Downloader",
          description: "Download X (Twitter) profile banners and header images in full HD resolution.",
          ratingValue: "4.8",
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
          { name: "Home", item: `${locale === 'en' ? '/' : '/' + locale}` },
          { name: "X (Twitter)", item: `${locale === 'en' ? '' : '/' + locale}/x-video-downloader` },
          { name: "Banner Downloader", item: `${locale === 'en' ? '' : '/' + locale}/x-banner-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "X (Twitter)", href: "/x-video-downloader" },
          { label: "Banner Downloader", href: "/x-banner-downloader" }
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

      <FeaturesSection platform="X Media" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More X Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "DP Downloader", href: "/x-profile-picture-downloader" },
              { title: "Video Downloader", href: "/x-video-downloader" },
              { title: "Media Downloader", href: "/x-media-downloader" },
              { title: "Trending Hashtags", href: "/x-trending-hashtag-finder" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-blue-500 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="X Media" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <XPreviewMockup type="banner" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-black text-white px-4 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Save X Banners Instantly!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90 text-neutral-400">
                View and download high-resolution Twitter profile headers securely with our web tool.
            </p>
            <Link 
                href={`${locale === 'en' ? '' : '/' + locale}/x-banner-downloader`}
                className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                Download Banner
            </Link>
        </div>
      </section>
    </>
  )
}
