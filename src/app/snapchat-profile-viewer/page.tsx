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
  const seoData = await getToolSeoData("snapchat-profile-viewer", 'en');
  return { 
    title: seoData.meta?.title || "Snapchat Profile Viewer – View Snap Profiles Online",
    description: seoData.meta?.description || "View public Snapchat profiles and look up usernames online. Explore snap account details privately without the official app.",
    alternates: getSeoAlternates("snapchat-profile-viewer", 'en'),
  }
}
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("snapchat-profile-viewer", locale);
  const { articleSections, faqs, header } = seoData;



  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          title: "SavClip Snapchat Profile Viewer",
          description: "View Snapchat public profiles, Bitmojis, and stories online anonymously.",
          ratingValue: "4.9",
          reviewCount: "6300"
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
          { name: "Snapchat", item: `/snapchat-video-downloader` },
          { name: "Profile Viewer", item: `/snapchat-profile-viewer` }
        ]}
      />

      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Snapchat", href: "/snapchat-video-downloader" },
          { label: "Profile Viewer", href: "/snapchat-profile-viewer" }
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
            {/* Using related tools for Snap */}
            {[
              { title: "DP Downloader", href: "/snapchat-dp-downloader" },
              { title: "Story Downloader", href: "/snapchat-stories-downloader" },
              { title: "Video Downloader", href: "/snapchat-video-downloader" }
            ].map((tool, i) => (
              <Link 
                key={i}
                href={`${tool.href}`}
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
                <SnapchatPreviewMockup type="profile" />
              </div>
        </div>
      </div>

      

      <CategoryCards />

      <section className="py-20 bg-yellow-400 text-black px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8 leading-tight">
                Explore the Web!
            </h2>
            <p className="text-xl font-bold mb-12 opacity-90">
                View public Snapchat profiles and content directly in your browser, entirely anonymously.
            </p>
            <Link 
                href={`/snapchat-profile-viewer`}
                className="px-12 py-5 bg-black text-yellow-400 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform inline-block shadow-2xl"
            >
                View Profile
            </Link>
        </div>
      </section>
    </>
  )
}
