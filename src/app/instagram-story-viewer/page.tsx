import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { InstagramPreviewMockup } from "@/components/shared/InstagramPreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getToolSeoData("instagram-story-viewer", 'en');
  return { 
    title: seoData.meta?.title || "Instagram Story Viewer & Downloader: Save IG Stories Privately",
    description: seoData.meta?.description || "View and download Instagram stories anonymously in high resolution. Watch IG stories privately without leaving a view trace or login.",
    alternates: getSeoAlternates("instagram-story-viewer", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("instagram-story-viewer", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Instagram Story Viewer",
          description: "View Instagram stories anonymously and without an account in HD.",
          ratingValue: "4.9",
          reviewCount: "5800"
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
          { name: "Instagram", item: `${locale === 'en' ? '' : '/' + locale}/instagram-video-downloader` },
          { name: "Story Viewer", item: `${locale === 'en' ? '' : '/' + locale}/instagram-story-viewer` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Instagram", href: "/instagram-video-downloader" },
          { label: "Story Viewer", href: "/instagram-story-viewer" }
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

      <FeaturesSection platform="Instagram Story" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More IG Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Reels Downloader", href: "/instagram-reels-downloader" },
              { title: "Video Downloader", href: "/instagram-video-downloader" },
              { title: "Photo Downloader", href: "/instagram-photo-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-purple-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Instagram Story" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <InstagramPreviewMockup type="story" />
              </div>
        </div>
      </div>

      {/* Blog & Guides Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest text-center mb-12 leading-tight">
            Story Viewing Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "How to Watch IG Stories Secretly", desc: "The ultimate guide to staying invisible on Instagram." },
              { title: "Saving Stories for Offline Viewing", desc: "Tips for archiving your favorite moments safely." },
              { title: "Why Privacy in Social Media Matters", desc: "Understanding the importance of anonymous browsing." }
            ].map((blog, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-800 hover:border-purple-500/30 transition-all">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-purple-600 transition-colors">{blog.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold mb-4">{blog.desc}</p>
                <Link href={`${locale === 'en' ? '/' : '/' + locale}`} className="text-xs font-black uppercase tracking-widest text-purple-600 hover:translate-x-1 transition-transform inline-block">Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryCards />
    </>
  )
}
