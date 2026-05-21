import { SearchHeader } from "@/components/layout/SearchHeader"
import { getSeoAlternates } from "@/lib/seo"
import type { Metadata } from "next"
import { FeaturesSection } from "@/components/layout/FeaturesSection"
import { FAQSection } from "@/components/layout/FAQSection"
import { RichArticle } from "@/components/shared/RichArticle"
import { StructuredData } from "@/components/shared/StructuredData"
import { Breadcrumb } from "@/components/shared/Breadcrumb"
import { getToolSeoData } from "@/lib/getSeoData"

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("telegram-channel-link-generator", locale);
  return { 
    title: seoData.meta?.title || "Telegram Channel Link Generator - SavClip",
    description: seoData.meta?.description || "Create custom direct links and clean join paths for your Telegram channels and groups. Boost organic subscriber tracking with smart URLs.",
    alternates: getSeoAlternates("telegram-channel-link-generator", locale),
  }
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = 'en';
  const seoData = await getToolSeoData("telegram-channel-link-generator", locale);
  const { articleSections, faqs, header } = seoData;

  return (
    <>
      <StructuredData
        type="FAQPage"
        data={{ items: faqs }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={[
          { name: "Home", item: `${locale === 'en' ? '/' : '/' + locale}` },
          { name: "Telegram", item: `${locale === 'en' ? '' : '/' + locale}/telegram-video-downloader` },
          { name: "Channel Link Generator", item: `${locale === 'en' ? '' : '/' + locale}/telegram-channel-link-generator` }
        ]}
      />
      
      <Breadcrumb 
        locale={locale} 
        items={[
          { label: "Telegram", href: "/telegram-video-downloader" },
          { label: "Channel Link Generator", href: "/telegram-channel-link-generator" }
        ]} 
      />

      <SearchHeader {...header} />

      <div className="bg-white dark:bg-black pt-8 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <RichArticle sections={articleSections} />
        </div>
      </div>

      <FeaturesSection platform="Telegram" />
      <FAQSection platform="Telegram" items={faqs} />
    </>
  )
}
