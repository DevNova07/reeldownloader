import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { CategoryCards } from "@/components/layout/CategoryCards"
import { YoutubePreviewMockup } from "@/components/shared/YoutubePreviewMockup"
import Link from "next/link"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  return { 
  title: "YouTube Description Generator – AI SEO Video Descriptions",
  description: "Save your favorite YouTube media instantly without any logos. Our free online tool gives you crisp quality directly to your device.",
    alternates: getSeoAlternates("youtube-description-generator", params.locale),
   
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params;
  const seoData = await getToolSeoData("youtube-description-generator", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip YouTube Description Generator",
          description: "Generate SEO-optimized YouTube video descriptions online for free.",
          ratingValue: "4.9",
          reviewCount: "3800"
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
          { name: "YouTube", item: `/${locale}/youtube-video-downloader` },
          { name: "Description Generator", item: `/${locale}/youtube-description-generator` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "YouTube", href: "/youtube-video-downloader" },
          { label: "Description Generator", href: "/youtube-description-generator" }
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

      <FeaturesSection platform="YouTube Description" />

      {/* Related Tools */}
      <section className="py-20 bg-white dark:bg-black px-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white uppercase italic tracking-wider md:tracking-widest mb-12 leading-tight">
            Explore More YT Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Title Generator", href: "/youtube-title-generator" },
              { title: "Tag Generator", href: "/youtube-tag-generator" },
              { title: "Channel Audit", href: "/youtube-channel-audit-tool" },
              { title: "Video Downloader", href: "/youtube-video-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`/${locale}${tool.href}`}
                className="p-6 bg-white dark:bg-neutral-800 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-700 font-bold text-neutral-900 dark:text-white hover:text-red-600 transition-colors"
              >
                {tool.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection platform="YouTube Description" items={faqs} />

      
      {/* SCREENSHOT */}
      <div className="bg-white dark:bg-black pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-4xl overflow-hidden shadow-2xl border border-neutral-100 dark:border-neutral-800">
                <YoutubePreviewMockup type="description" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-red-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Write Like a Pro!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                Generate highly relevant, SEO-optimized descriptions for your YouTube videos in seconds with AI.
            </p>
            <Link 
                href={`/${locale}/youtube-description-generator`}
                className="px-12 py-5 bg-white text-red-600 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                Generate Copy
            </Link>
        </div>
      </section>
    </>
  )
}
