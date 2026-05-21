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
  const seoData = await getToolSeoData("instagram-carousel-downloader", 'en');
  return { 
    title: seoData.meta?.title || "Instagram Carousel Downloader – Save Multiple Photos & Videos | SavClip",
    description: seoData.meta?.description || "Download multiple photos and videos from Instagram carousel posts. Save entire IG slide posts in original quality at once.",
    alternates: getSeoAlternates("instagram-carousel-downloader", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("instagram-carousel-downloader", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Instagram Carousel Downloader",
          description: "Download Instagram carousel posts and multi-media collections in HD.",
          ratingValue: "4.9",
          reviewCount: "4200"
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
          { name: "Carousel Downloader", item: `${locale === 'en' ? '' : '/' + locale}/instagram-carousel-downloader` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Instagram", href: "/instagram-video-downloader" },
          { label: "Carousel Downloader", href: "/instagram-carousel-downloader" }
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

      <FeaturesSection platform="Instagram Carousel" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            More Instagram Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Video Downloader", href: "/instagram-video-downloader" },
              { title: "Reels Downloader", href: "/instagram-reels-downloader" },
              { title: "Photo Downloader", href: "/instagram-photo-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${locale === 'en' ? '' : '/' + locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-orange-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="Instagram Carousel" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <InstagramPreviewMockup type="carousel" />
              </div>
        </div>
      </div>

      {/* Blog & Guides Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900/50 px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest text-center mb-12 leading-tight">
            Multi-Post Guides & Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "How to Create Viral Instagram Carousels", desc: "Tips for storytelling and engagement through multi-posts." },
              { title: "Saving Full Albums from IG Profiles", desc: "A guide to using SavClip for complete media archiving." },
              { title: "Optimizing Carousel Resolution for 2026", desc: "How to ensure your multi-posts look crisp on all devices." }
            ].map((blog, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-neutral-900 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-800 hover:border-orange-500/30 transition-all">
                <h3 className="text-lg font-black text-neutral-900 dark:text-white uppercase italic tracking-tight mb-2 group-hover:text-orange-600 transition-colors">{blog.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-bold mb-4">{blog.desc}</p>
                <Link href={`${locale === 'en' ? '/' : '/' + locale}`} className="text-xs font-black uppercase tracking-widest text-orange-600 hover:translate-x-1 transition-transform inline-block">Read More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CategoryCards />
    </>
  )
}
