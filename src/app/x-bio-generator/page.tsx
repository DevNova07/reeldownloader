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
  const seoData = await getToolSeoData("x-bio-generator", 'en');
  return { 
    title: seoData.meta?.title || "X Bio Generator – AI Powered Twitter Bio Creator",
    description: seoData.meta?.description || "Generate professional, catchy, or witty profile descriptions using SavClip",
    alternates: getSeoAlternates("x-bio-generator", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("x-bio-generator", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip X Bio Generator",
          description: "Generate professional and creative X (Twitter) bios using AI for free.",
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
          { name: "X (Twitter)", item: `${locale === 'en' ? '' : '/' + locale}/x-video-downloader` },
          { name: "Bio Generator", item: `${locale === 'en' ? '' : '/' + locale}/x-bio-generator` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "X (Twitter)", href: "/x-video-downloader" },
          { label: "Bio Generator", href: "/x-bio-generator" }
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
              { title: "Analytics Viewer", href: "/x-analytics-viewer" },
              { title: "Trending Hashtags", href: "/x-trending-hashtag-finder" },
              { title: "Video Downloader", href: "/x-video-downloader" },
              { title: "Thread Saver", href: "/x-thread-downloader" }
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
                <XPreviewMockup type="bio" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-black text-white px-4 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Build Your Brand!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90 text-neutral-400">
                Generate high-converting Twitter bios instantly with our professional AI copywriting tool.
            </p>
            <Link 
                href={`${locale === 'en' ? '' : '/' + locale}/x-bio-generator`}
                className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
                Generate Bio
            </Link>
        </div>
      </section>
    </>
  )
}
