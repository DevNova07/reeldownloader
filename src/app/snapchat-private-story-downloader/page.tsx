import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { SnapchatPreviewMockup } from "@/components/shared/SnapchatPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getToolSeoData("snapchat-private-story-downloader", 'en');
  return { 
    title: seoData.meta?.title || "Snapchat Private Story Downloader – Save Private Snaps",
    description: seoData.meta?.description || "Save private Snapchat stories securely. Download custom-shared group snaps or personal stories safely in high resolution.",
    alternates: getSeoAlternates("snapchat-private-story-downloader", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("snapchat-private-story-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Snapchat Private Story Downloader",
          description: "Securely download private Snapchat stories and videos without notifications.",
          ratingValue: "4.8",
          reviewCount: "3100"
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
          { name: "Snapchat", item: `${locale === 'en' ? '' : '/' + locale}/snapchat-video-downloader` },
          { name: "Private Downloader", item: `${locale === 'en' ? '' : '/' + locale}/snapchat-private-story-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Snapchat", href: "/snapchat-video-downloader" },
          { label: "Private Downloader", href: "/snapchat-private-story-downloader" }
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

      <FeaturesSection platform="Snapchat Video" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More Snapchat Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Story Downloader", href: "/snapchat-stories-downloader" },
              { title: "Video Downloader", href: "/snapchat-video-downloader" },
              { title: "Photo Saver", href: "/snapchat-photo-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-yellow-500 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Snapchat Video" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <SnapchatPreviewMockup type="private" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-yellow-400 text-black px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Save Privately!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Download private videos safely without triggering screenshot notifications.
            </p>
            <Link 
                href={`${locale === 'en' ? '' : '/' + locale}/snapchat-private-story-downloader`}
                className="px-12 py-5 bg-black text-yellow-400 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Secure Download
            </Link>
        </div>
      </section>
    </>
  )
}
